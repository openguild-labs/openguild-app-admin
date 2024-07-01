import { useMutation, useQuery } from "@tanstack/react-query";
import {
  countTotalMissionsCategories,
  createMissionCategory,
  listAllMissionsCategories,
  listMissionsCategories,
  updateMissionCategory,
} from "./caller";

export const missionCategoryKey = {
  missionCategories: "missionCategories",
  allMissionsCategories: "allMissionsCategories",
};

export const useCreateMissionCategory = () => {
  return useMutation({
    mutationFn: (req: TMissionCategoryCreation) => createMissionCategory(req),
  });
};

export const useListMissionCategories = (query: TMissionCategoryQuery) => {
  return useQuery({
    queryKey: [missionCategoryKey.missionCategories, query.pagination.page, query.pagination.limit],
    queryFn: () => listMissionsCategories(query),
  });
};

export const useCountMissionCategories = () => {
  return useQuery({
    queryKey: [missionCategoryKey.missionCategories],
    queryFn: () => countTotalMissionsCategories(),
  });
};

export const useUpdateMissionCategory = () => {
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: TMissionCategoryUpdate }) => updateMissionCategory(id, request),
  });
};

export const useListAllMissionCategories = () => {
  return useQuery({
    queryKey: [missionCategoryKey.allMissionsCategories],
    queryFn: () => listAllMissionsCategories(),
  });
};
