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
