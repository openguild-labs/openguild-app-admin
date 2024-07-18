const channelID = process.env.NEXT_PUBLIC_CHANNEL_ID as string;
const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN as string;

export async function POST() {
  const res = await fetch(`https://discord.com/api/v10/channels/${channelID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${botToken}`,
    },
    body: JSON.stringify({
      content: "mission is created!",
    }),
  });

  return Response.json(res);
}
