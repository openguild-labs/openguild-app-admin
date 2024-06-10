import { useMutation } from "@tanstack/react-query";
import { createMission } from "./caller";
import { message, UploadFile } from "antd";

export const missionKey = {
  mission: "mission",
};

export const useCreateMission = () => {
  return useMutation({
    mutationKey: [missionKey.mission],
    mutationFn: (missionCreation: TMissionCreation<UploadFile>) => createMission(missionCreation),
    onSuccess: (resp) => {
      if (resp === undefined) {
        return;
      }
      message.success("Mission created");
    },
  });
};
