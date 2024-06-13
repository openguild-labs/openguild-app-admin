import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";

export const uploadBanner = async (missionID: number, file: UploadFile) => {
  const { data, error } = await supabase.storage.from("banners").upload(`${missionID}/${file.name}`, file.originFileObj as Blob);
  if (error !== null) {
    message.error("Error uploading image");
    return "";
  }

  return data.path;
};

export const getStatusMission = (start_date: string, end_date: string) => {
  const now = new Date();
  const end = new Date(end_date);
  const start = new Date(start_date);

  if (start > now) {
    return `Starts in ${start.getDate() - now.getDate()}d ${Math.abs(start.getHours() - now.getHours())}h ${Math.abs(
      start.getMinutes() - now.getMinutes()
    )}m`;
  }

  if (start <= now && end > now) {
    return `Ends in ${end.getDate() - now.getDate()}d ${Math.abs(end.getHours() - now.getHours())}h ${Math.abs(
      end.getMinutes() - now.getMinutes()
    )}m`;
  }

  if (end <= now) {
    return "Ended";
  }

  return "--";
};
