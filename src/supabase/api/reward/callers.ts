import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";
import { uploadImage } from "./util";

export const createReward = async (rewardCreation: TRewardCreation<UploadFile>) => {
  const { data, error } = await supabase
    .from("reward")
    .insert({
      name: rewardCreation.name,
      description: rewardCreation.description,
      quantity: rewardCreation.quantity,
      type: rewardCreation.type,
      requirements: rewardCreation.requirements,
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
