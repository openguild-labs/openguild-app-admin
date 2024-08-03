import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";
import webpfy from "webpfy";

export const uploadImage = async (rewardID: number, file: UploadFile) => {
  const { webpBlob, fileName } = await webpfy({
    image: file.originFileObj as Blob,
    quality: 0.8,
  });
  const { data, error } = await supabase.storage.from("reward_images").upload(`${rewardID}/${fileName}`, webpBlob);
  if (error !== null) {
    message.error("Error uploading image");
    return "";
  }

  return data.path;
};
