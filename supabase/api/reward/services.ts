import { useMutation, useQuery } from "@tanstack/react-query";
import { message, UploadFile } from "antd";
import { countTotalRewards, createReward, deleteReward, getReward, listRewards, updateImage, updateReward } from "./callers";

export const rewardKey = {
  reward: "reward",
  rewards: "rewards",
};

export const useCreateReward = () => {
  return useMutation({
    mutationFn: (rewardCreation: TRewardCreation<UploadFile>) => createReward(rewardCreation),
    onSuccess: (resp) => {
      if (resp === undefined) {
        return;
      }
      message.success("Reward is created");
    },
  });
};

export const useListReward = (rewardQuery: TRewardQuery) => {
  return useQuery({
    queryKey: [rewardKey.rewards, rewardQuery.pagination.page, rewardQuery.pagination.limit],
    queryFn: () => listRewards(rewardQuery),
  });
};

export const useCountTotalRewards = () => {
  return useQuery({
    queryKey: [rewardKey.rewards],
    queryFn: () => countTotalRewards(),
  });
};

export const useGetReward = (id: string) => {
  return useQuery({
    queryKey: [rewardKey.reward, id],
    queryFn: () => getReward(id),
  });
};

export const useUpdateReward = () => {
  return useMutation({
    mutationFn: (update: TRewardUpdate) => updateReward(update),
  });
};

export const useUpdateImage = () => {
  return useMutation({
    mutationFn: (update: TUpdateImage) => updateImage(update),
  });
};

export const useDeleteReward = () => {
  return useMutation({
    mutationFn: (id: string) => deleteReward(id),
  });
};
