import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";
import { uploadImage } from "./util";

const EXPIRED_TIME = 60 * 60; // 1 hour

export const createReward = async (rewardCreation: TRewardCreation<UploadFile>) => {
  const { data, error } = await supabase
    .from("reward")
    .insert({
      name: rewardCreation.name,
      description: rewardCreation.description,
      quantity: rewardCreation.quantity,
      type: rewardCreation.type,
      requirements: rewardCreation.requirements,
      is_shared: rewardCreation.is_shared,
    })
    .select<string, TRewardModel>();

  if (error !== null || data === null) {
    message.error("Error creating reward");
    return undefined;
  }

  const reward = data[0];
  const image = await uploadImage(reward.id, rewardCreation.image);
  if (image === "") {
    message.error("Error uploading image");
    return undefined;
  }

  const { error: updateError } = await supabase.from("reward").update({ image }).eq("id", reward.id);
  if (updateError !== null) {
    message.error("Error updating reward");
    return undefined;
  }

  return reward;
};

export const listRewards = async ({ pagination }: TRewardQuery) => {
  const start = pagination.page * pagination.limit;
  const { data, error } = await supabase
    .from("reward")
    .select<string, TRewardModel>()
    .is("deleted_at", null)
    .range(start, start + pagination.limit - 1)
    .order("id", { ascending: true });
  if (error !== null || data === null) {
    message.error("Error fetching rewards");
    return [] as TRewardModel[];
  }

  return data;
};

export const countTotalRewards = async () => {
  const { data, error } = await supabase.from("reward").select("id", { count: "exact" }).is("deleted_at", null);
  if (error !== null || data === null) {
    message.error("Error fetching rewards");
    return 0;
  }

  return data.length;
};

export const getReward = async (id: string) => {
  const { data, error } = await supabase.from("reward").select<string, TRewardModel>().eq("id", id).is("deleted_at", null);
  if (error !== null || data === null) {
    message.error("Error fetching reward");
    return undefined;
  }
  const reward = data[0];
  const getImagePromise = supabase.storage.from("reward_images").getPublicUrl(reward.image);
  const getMissionPromise = supabase
    .from("mission")
    .select<string, TMissionModel>()
    .in("id", reward.requirements.split(","))
    .is("deleted_at", null);

  const [{ data: imageData }, { data: missionData, error: missionError }] = await Promise.all([getImagePromise, getMissionPromise]);
  if (missionError !== null || missionData === null) {
    message.error("Error fetching reward");
    return undefined;
  }

  return {
    ...reward,
    image_url: imageData.publicUrl,
    missions: missionData,
  } as TRewardDetailResponse;
};

export const updateReward = async (update: TRewardUpdate) => {
  const { error } = await supabase
    .from("reward")
    .update(
      update.updates.reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {} as Record<string, string | number | boolean>)
    )
    .eq("id", update.rewardID);
  if (error !== null) {
    message.error("Error updating reward");
  }
};

export const updateImage = async ({ rewardID, oldImage, file }: TUpdateImage) => {
  const deleteImagePromise = supabase.storage.from("reward_images").remove([oldImage]);
  const uploadImagePromise = supabase.storage.from("reward_images").upload(`${rewardID}/${file.name}`, file.originFileObj as Blob);

  const [{ error: deleteError }, { data, error: uploadError }] = await Promise.all([deleteImagePromise, uploadImagePromise]);
  if (deleteError !== null || uploadError !== null) {
    message.error("Error updating image");
    return;
  }

  const { error } = await supabase.from("reward").update({ image: data.path }).eq("id", rewardID);
  if (error !== null) {
    message.error("Error updating image");
  }
};
