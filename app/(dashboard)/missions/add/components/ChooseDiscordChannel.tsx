import { useGetListChannels, useGetListRoles } from "@/app/api/services";
import { DISCORD_DM_CHANNEL_TYPE, DISCORD_GROUP_DM_CHANNEL_TYPE, DISCORD_GUILD_TEXT_CHANNEL_TYPE } from "@/constants/discord";
import { Form, Select } from "antd";

function ChooseDiscordChannel() {
  const { data: channels } = useGetListChannels();
  const validChannelTypes = [DISCORD_GUILD_TEXT_CHANNEL_TYPE, DISCORD_DM_CHANNEL_TYPE, DISCORD_GROUP_DM_CHANNEL_TYPE];
  const filteredChannels = channels !== undefined ? channels?.filter((channel) => validChannelTypes.includes(channel.type)) : [];
  const channelList = filteredChannels.map((channel) => ({ label: channel.name, value: channel.id }));

  const { data: roles } = useGetListRoles();
  const roleList = roles !== undefined ? roles.map((role) => ({ label: role.name, value: role.id })) : [];

  return (
    <div>
      <h3 className="text-base xl:text-lg font-bold">Choose Discord Channel to send the notification</h3>
      <Form.Item
        name="channel_id"
        rules={[
          {
            required: true,
            message: "Please select channel",
          },
        ]}
        className="w-full"
      >
        <Select placeholder="Select channel" options={channelList} className="w-full" />
      </Form.Item>
      <Form.Item
        name="role_id"
        rules={[
          {
            required: true,
            message: "Please select role",
          },
        ]}
        className="w-full"
      >
        <Select placeholder="Select role" options={roleList} className="w-full mt-4" />
      </Form.Item>
    </div>
  );
}

export default ChooseDiscordChannel;
