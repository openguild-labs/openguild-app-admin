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
  if (missionCreationError !== null || data === null) {
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
      button_placeholder: task.button_placeholder !== undefined ? task.button_placeholder : "",
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

  const getParticipantQuantityPromise = supabase.from("participant_quantity_view").select<string, TParticipantQuantityResponse>();

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
  const getBannerPromise = supabase.storage.from("banners").getPublicUrl(mission.banner);
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
    { data: bannerData },
    { data: tasksData, error: fetchTasksError },
    { data: missionCategoryData, error: fetchMissionCategoryError },
  ] = await Promise.all([getBannerPromise, getTasksPromise, getMissionCategoryPromise]);

  const errorIsNotNull = fetchTasksError !== null || fetchMissionCategoryError !== null;
  const dataIsNull = tasksData === null || missionCategoryData === null;
  if (errorIsNotNull || dataIsNull) {
    message.error("Error fetching data");
    return undefined;
  }

  const banner_url = bannerData.publicUrl;
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
      button_placeholder: task.button_placeholder !== undefined ? task.button_placeholder : "",
      xp: task.xp,
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

export const listAllMissions = async (search: string) => {
  const listAllPromise = supabase
    .from("mission")
    .select<string, TMissionModel>()
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (search !== "") {
    listAllPromise.like("title", `%${search}%`);
  }

  const { data, error } = await listAllPromise;

  if (error !== null) {
    message.error("Error fetching missions");
    return undefined;
  }

  return data;
};

export const listPoW = async (missionID: string) => {
  const { data: tasks, error: fetchTasksError } = await supabase
    .from("task")
    .select<string, TMissionModel>()
    .eq("mission_id", missionID)
    .is("deleted_at", null);

  if (fetchTasksError !== null || tasks === null) {
    message.error("Error fetching tasks");
    return undefined;
  }
  const taskIDs = tasks.map((task) => task.id);
  const { data: powData, error: fetchPoWError } = await supabase
    .from("proofs_of_work")
    .select<string, TProofsOfWorkResponse>(
      `
        id,
        proof,
        image,
        is_verified,
        user (
          id,
          discord
        )
      `
    )
    .is("deleted_at", null)
    .in("task_id", taskIDs)
    .order("created_at", { ascending: true });
  if (fetchPoWError !== null || powData === null) {
    message.error("Error fetching proofs of work");
    return undefined;
  }

  if (powData.length > 0) {
    const images = [];
    for (const pow of powData) {
      if (pow.image !== null && pow.image !== undefined && pow.image !== "") {
        images.push(pow.image);
      }
    }

    if (images.length > 0) {
      const imageResp = await Promise.all(images.map((image) => supabase.storage.from("proofs_of_work").getPublicUrl(image)));

      for (let i = 0; i < powData.length; i++) {
        powData[i].image_url = imageResp[i].data.publicUrl;
      }
    }
  }
  return powData;
};

export const verifyPoW = async (PoWID: number) => {
  const { error } = await supabase.from("proofs_of_work").update({ is_verified: true }).eq("id", PoWID);
  if (error !== null) {
    message.error("Error verifying proof of work");
    return false;
  }
  return true;
};
