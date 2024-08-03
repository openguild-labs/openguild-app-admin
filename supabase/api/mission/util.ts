import { supabase } from "@/supabase";
import { UploadFile } from "antd";
import webpfy from "webpfy";

export const uploadBanner = async (missionID: number, file: UploadFile) => {
  const { webpBlob, fileName } = await webpfy({
    image: file.originFileObj as Blob,
    quality: 0.8,
  });
  const { data, error } = await supabase.storage.from("banners").upload(`${missionID}/${fileName}`, webpBlob);
  if (error !== null) {
    return "";
  }

  return data.path;
};

const countDownTimeUnit = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const countdownDay = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const countdownHour = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)) - countdownDay * 24;
  const countdownMinute = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60)) - countdownDay * 24 * 60 - countdownHour * 60;
  return [countdownDay, countdownHour, countdownMinute];
};

export const getStatusMission = (start_date: string, end_date: string) => {
  const now = new Date();
  const end = new Date(end_date);
  const start = new Date(start_date);

  if (start > now) {
    const [countdownDay, countdownHour, countdownMinute] = countDownTimeUnit(now, start);
    return `Starts in ${countdownDay}d ${countdownHour}h ${countdownMinute}m`;
  }

  if (start <= now && end > now) {
    const [countdownDay, countdownHour, countdownMinute] = countDownTimeUnit(now, end);
    return `Ends in ${countdownDay}d ${countdownHour}h ${countdownMinute}m`;
  }

  if (end <= now) {
    return "Ended";
  }

  return "--";
};
