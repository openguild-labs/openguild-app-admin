export const getChanelList = async () => {
  const data = await fetch("/api/guilds/channels", {
    method: "GET",
  });

  const dataJson = await data.json();
  return dataJson.data as TDiscordChannelResponse[];
};

export const getRoleList = async () => {
  const data = await fetch("/api/guilds/roles", {
    method: "GET",
  });

  const dataJson = await data.json();
  return dataJson.data as TDiscordRoleResponse[];
};

export const sendMessageToDiscordChannel = async (req: TDiscordSendMessageRequest) => {
  try {
    fetch("/api/channels/messages", {
      method: "POST",
      body: JSON.stringify(req),
    });
  } catch (error) {
    console.log(error);
  }
};
