import { useMutation } from "@tanstack/react-query";
import { message, UploadFile } from "antd";
import { createReward } from "./callers";

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
