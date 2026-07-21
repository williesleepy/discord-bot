import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const CHANNEL_ID = "1463683148696256624";
const STREAM_PING_ROLE_ID = "1463725368899801158";

const STREAMERS = [
  {
    username: "twowhitaker",
    name: "twoWhit",
    wasLive: null,
  },
];

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

async function checkStreamerLiveStatus(streamer) {
  const liveApiUrl = `https://tiktok-live-api-0k0j.onrender.com/live/${streamer.username}`;
  const liveUrl = `https://www.tiktok.com/@${streamer.username}/live`;

  try {
    const response = await fetch(liveApiUrl);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    console.log("Live check:", data);

    // First check after startup: establish the initial state without notifying.
    if (streamer.wasLive === null) {
      streamer.wasLive = data.isLive;
      return;
    }

    if (data.isLive && !streamer.wasLive) {
      streamer.wasLive = true;

      const channel = await client.channels.fetch(CHANNEL_ID);

      await channel.send(
        `<@&${STREAM_PING_ROLE_ID}>\n\n🔴 **${streamer.name} is LIVE!**\n${liveUrl}`
      );
    } else if (!data.isLive) {
      streamer.wasLive = false;
    }
  } catch (err) {
    console.error(`Live check failed for ${streamer.username}:`, err);
  }
}

async function checkAllLiveStatuses() {
  for (const streamer of STREAMERS) {
    await checkStreamerLiveStatus(streamer);
  }
}

client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Establish the initial live state for all streamers.
  await checkAllLiveStatuses();

  // Continue checking every minute.
  setInterval(checkAllLiveStatuses, 60_000);
});

client.login(DISCORD_TOKEN);