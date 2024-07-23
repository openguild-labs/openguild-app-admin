import { useMutation, useQuery } from "@tanstack/react-query";
import { getChanelList, getRoleList, sendMessageToDiscordChannel } from "./callers";

export const discordKey = {
  channels: "channels",
  roles: "roles",
};

export const useGetListChannels = () => {
  return useQuery({
    queryKey: [discordKey.channels],
    queryFn: () => getChanelList(),
  });
};

export const useGetListRoles = () => {
  return useQuery({
    queryKey: [discordKey.roles],
    queryFn: () => getRoleList(),
  });
};

export const useSendDiscordMessage = () => {
  return useMutation({
    mutationFn: (req: TDiscordSendMessageRequest) => sendMessageToDiscordChannel(req),
  });
};
