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

export const createMission = async (missionCreation: TMissionCreation<UploadFile>) => {
  const { data, error: missionCreationError } = await supabase
    .from("mission")
    .insert({
      title: missionCreation.title,
      description: missionCreation.description,
      start_date: missionCreation.start_date,
      end_date: missionCreation.end_date,
    })
    .select<string, TMissionModel>();
  if (missionCreationError !== null) {
    message.error("Error creating mission");
    return undefined;
  }

  const mission = data[0];
  const missionID = mission.id;
  const banner = await uploadBanner(missionID, missionCreation.banner);
  if (banner === "") {
    return undefined;
  }

  const { error: missionUpdateError } = await supabase.from("mission").update({ banner }).eq("id", missionID);
  if (missionUpdateError !== null) {
    message.error("Error updating mission");
    return undefined;
  }

  const { error: tasksCreationError } = await supabase
    .from("task")
    .insert(missionCreation.tasks.map((task) => ({ ...task, mission_id: missionID })));
  if (tasksCreationError !== null) {
    message.error("Error creating tasks");
    return undefined;
  }

  return mission;
};
