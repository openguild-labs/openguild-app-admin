import { useMutation, useQuery } from "@tanstack/react-query";
import { createMission, createTask, deleteTask, getMission, listMissions, updateBanner, updateMission, updateTask } from "./caller";
import { message, UploadFile } from "antd";

export const missionKey = {
  mission: "mission",
  missions: "missions",
};

export const useCreateMission = () => {
  return useMutation({
    mutationFn: (missionCreation: TMissionCreation<UploadFile>) => createMission(missionCreation),
    onSuccess: (resp) => {
      if (resp === undefined) {
        return;
      }
      message.success("Mission is created");
    },
  });
};

export const useListMissions = (missionQuery: TMissionQuery) => {
  return useQuery({
    queryKey: [
      missionKey.missions,
      missionQuery.pagination.limit,
      missionQuery.pagination.page,
      missionQuery.searchingTitle,
      missionQuery.status,
    ],
    queryFn: () => listMissions(missionQuery),
  });
};

export const useGetMission = (id: string) => {
  return useQuery({
    queryKey: [missionKey.mission, id],
    queryFn: () => getMission(id),
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (task: TTaskModel) => updateTask(task),
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskID: number) => deleteTask(taskID),
  });
};

export const useUpdateMission = () => {
  return useMutation({
    mutationFn: (update: TMissionUpdate) => updateMission(update),
  });
};

export const useUpdateBanner = () => {
  return useMutation({
    mutationFn: (update: TUpdateBanner) => updateBanner(update),
  });
};

export const useCreateTask = (missionID: string) => {
  return useMutation({
    mutationFn: (task: TTaskCreation) => createTask(missionID, task),
  });
};
