import { DISCORD_API_BASE_URL, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID } from "@/constants/discord";

export async function GET() {
  const res = await fetch(`${DISCORD_API_BASE_URL}/guilds/${DISCORD_GUILD_ID}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.40.0",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
  });
  const data = await res.json();
  console.log(data);
  return Response.json({ data });
}
