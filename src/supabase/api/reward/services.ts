import { useMutation, useQuery } from "@tanstack/react-query";
import { message, UploadFile } from "antd";
import { countTotalRewards, createReward, listRewards } from "./callers";

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
