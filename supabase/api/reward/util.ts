import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";

export const uploadImage = async (rewardID: number, file: UploadFile) => {
  const { data, error } = await supabase.storage.from("reward_images").upload(`${rewardID}/${file.name}`, file.originFileObj as Blob);
  if (error !== null) {
    message.error("Error uploading image");
    return "";
  }

  return data.path;
};
