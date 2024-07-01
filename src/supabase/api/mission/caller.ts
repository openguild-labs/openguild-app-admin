import { supabase } from "@/supabase";
import { message, UploadFile } from "antd";
import { getStatusMission, uploadBanner } from "./util";

const EXPIRED_TIME = 60 * 60; // 1 hour

export const createMission = async (missionCreation: TMissionCreation<UploadFile>) => {
  const { data, error: missionCreationError } = await supabase
    .from("mission")
    .insert({
      title: missionCreation.title,
      description: missionCreation.description,
      start_date: missionCreation.start_date,
      end_date: missionCreation.end_date,
      mission_category_id: missionCreation.mission_category_id,
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
    message.error("Error uploading banner");
    return undefined;
  }

  const updateMissionPromise = supabase.from("mission").update({ banner }).eq("id", missionID);
  const tasksCreationPromise = supabase.from("task").insert(
    missionCreation.tasks.map((task) => ({
      ...task,
      description: task.description !== undefined ? task.description : "",
      mission_id: missionID,
    }))
  );

  const [{ error: missionUpdateError }, { error: tasksCreationError }] = await Promise.all([updateMissionPromise, tasksCreationPromise]);

  if (missionUpdateError !== null) {
    message.error("Error updating mission");
    return undefined;
  }

  if (tasksCreationError !== null) {
    message.error("Error creating tasks");
    return undefined;
  }

  return mission;
};

export const listMissions = async ({ pagination, searchingTitle }: TMissionQuery) => {
  const start = pagination.page * pagination.limit;
  const result: TMissionListResponse = {
    list: [],
    total: 0,
  };

  let getListPromise = supabase
    .from("mission")
    .select<string, TMissionModel>()
    .is("deleted_at", null)
    .range(start, start + pagination.limit - 1)
    .order("id", { ascending: true });
  if (searchingTitle !== "") {
    getListPromise = getListPromise.like("title", `%${searchingTitle}%`);
  }

  let getTotalPromise = supabase.from("mission").select("id", { count: "exact" }).is("deleted_at", null).order("id", { ascending: true });
  if (searchingTitle !== "") {
    getTotalPromise = getTotalPromise.like("title", `%${searchingTitle}%`);
  }

  const getParticipantQuantityPromise = supabase.from("participant_quantity").select<string, TParticipantQuantityResponse>();

  const [{ data, error }, { data: totalData, error: totalError }, { data: participantQuantityData, error: participantQuantityError }] =
    await Promise.all([getListPromise, getTotalPromise, getParticipantQuantityPromise]);

  const isNotNullError = error !== null || totalError !== null || participantQuantityError !== null;
  const isNullData = data === null || totalData === null || participantQuantityData === null;
  if (isNotNullError || isNullData) {
    message.error("Error fetching missions");
    return result;
  }

  const dataResponse: TMissionResponse[] = data.map((mission) => {
    return {
      id: mission.id,
      title: mission.title,
      status: getStatusMission(mission.start_date, mission.end_date),
      participants: participantQuantityData.find((p) => p.mission_id === mission.id)?.quantity || 0,
      created_at: new Date(mission.created_at).toISOString().split("T")[0],
    };
  });
  result.list = dataResponse;
  result.total = totalData.length;

  return result;
};

export const getMission = async (id: string) => {
  const { data, error } = await supabase
    .from("mission")
    .select<string, TMissionModel>()
    .eq("id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  if (error !== null) {
    message.error("Error fetching mission");
    return undefined;
  }

  if (data.length === 0) {
    message.error("Mission not found");
    return undefined;
  }

  const mission = data[0];
  const getBannerPromise = supabase.storage.from("banners").createSignedUrl(mission.banner, EXPIRED_TIME);
  const getTasksPromise = supabase
    .from("task")
    .select<string, TTaskModel>()
    .eq("mission_id", id)
    .is("deleted_at", null)
    .order("id", { ascending: true });
  const getMissionCategoryPromise = supabase
    .from("mission_category")
    .select<string, TMissionCategoryModel>()
    .eq("id", mission.mission_category_id)
    .is("deleted_at", null);

  const [
    { data: bannerData, error: fetchBannerError },
    { data: tasksData, error: fetchTasksError },
    { data: missionCategoryData, error: fetchMissionCategoryError },
  ] = await Promise.all([getBannerPromise, getTasksPromise, getMissionCategoryPromise]);

  const errorIsNotNull = fetchBannerError !== null || fetchTasksError !== null || fetchMissionCategoryError !== null;
  const dataIsNull = bannerData === null || tasksData === null || missionCategoryData === null;
  if (errorIsNotNull || dataIsNull) {
    message.error("Error fetching data");
    return undefined;
  }

  const banner_url = bannerData.signedUrl;
  return { ...mission, banner_url, tasks: tasksData, mission_category: missionCategoryData[0] } as TMissionDetailResponse;
};

export const updateTask = async (task: TTaskModel) => {
  const { error } = await supabase
    .from("task")
    .update({
      name: task.name,
      type: task.type,
      action: task.action,
      description: task.description !== undefined ? task.description : "",
    })
    .eq("id", task.id)
    .is("deleted_at", null);
  if (error !== null) {
    message.error("Error updating task");
  }
};

export const deleteTask = async (id: number) => {
  const { error } = await supabase.from("task").update({ deleted_at: new Date().toISOString() }).eq("id", id);
  if (error !== null) {
    message.error("Error deleting task");
  }
};

export const updateMission = async (update: TMissionUpdate) => {
  const { error } = await supabase
    .from("mission")
    .update(
      update.updates.reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {} as Record<string, string | number>)
    )
    .eq("id", update.missionID);
  if (error !== null) {
    message.error("Error updating mission");
  }
};

export const updateBanner = async ({ missionID, oldBanner, file }: TUpdateBanner) => {
  const deleteBannerPromise = supabase.storage.from("banners").remove([oldBanner]);
  const uploadBannerPromise = supabase.storage.from("banners").upload(`${missionID}/${file.name}`, file.originFileObj as Blob);

  const [{ error: deleteError }, { data, error: uploadError }] = await Promise.all([deleteBannerPromise, uploadBannerPromise]);
  if (deleteError !== null || uploadError !== null) {
    message.error("Error updating banner");
    return;
  }

  const { error } = await supabase.from("mission").update({ banner: data.path }).eq("id", missionID);
  if (error !== null) {
    message.error("Error updating banner");
  }
};

export const createTask = async (missionID: string, task: TTaskCreation) => {
  const { error } = await supabase.from("task").insert({
    ...task,
    description: task.description !== undefined ? task.description : "",
    mission_id: missionID,
  });
  if (error !== null) {
    message.error("Error creating task");
  }
};
