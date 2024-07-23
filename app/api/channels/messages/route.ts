import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, OG_CLIENT_BASE_URL } from "@/constants/discord";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as TDiscordSendMessageRequest;
  console.log("=== data ", data);
  const res = await fetch(`${DISCORD_API_BASE_URL}/channels/${data.channel_id}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      content: `<@&${data.role_id}> ${OG_CLIENT_BASE_URL}/missions/${data.mission_id}`,
    }),
  });
  const r = await res.json();
  console.log("=== res ", r);
  return Response.json(res);
}
