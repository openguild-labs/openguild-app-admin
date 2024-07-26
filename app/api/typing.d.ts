type TDiscordChannelResponse = {
  id: string;
  name: string;
  type: number;
};
// {
//     id: '1264104618217177109',
//     type: 0,
//     last_message_id: null,
//     flags: 0,
//     guild_id: '1258710134537060444',
//     name: 'rules',
//     parent_id: null,
//     rate_limit_per_user: 0,
//     topic: null,
//     position: 0,
//     permission_overwrites: [ [Object] ],
//     nsfw: false
//   },

type TDiscordRoleResponse = {
  id: string;
  name: string;
};
//  {
//     id: '1258768605827301379',
//     name: 'MEE6',
//     description: null,
//     permissions: '364870364415',
//     position: 1,
//     color: 0,
//     hoist: false,
//     managed: true,
//     mentionable: false,
//     icon: null,
//     unicode_emoji: null,
//     tags: { bot_id: '159985870458322944' },
//     flags: 0
//   },

type TDiscordSendMessageRequest = {
  channel_id: string;
  role_ids: string[];
  mission_id: number;
  content: string;
};
