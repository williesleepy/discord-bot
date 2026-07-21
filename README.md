# Live Notify ⭐

A lightweight Discord bot that monitors TikTok live status and automatically posts a notification when a streamer goes live.

Instead of repeatedly announcing an active livestream, the bot only notifies your server when a streamer transitions from **offline → live**, ensuring members receive exactly one notification per stream.

---

## Features

- 🔴 Monitors one or more TikTok streamers
- 📣 Automatically posts live notifications to a Discord channel
- 🏷️ Mentions a configurable Discord role (e.g. `@stream ping`)
- 🚫 Prevents duplicate notifications during the same livestream
- ⚡ Lightweight and easy to deploy on services like Render

---

## Requirements

- Node.js 20+
- A Discord bot
- A Discord server where the bot has permission to:
  - View the target channel
  - Send messages
  - Mention the configured role
- A TikTok live status API endpoint

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd discord-bot
```

Install dependencies:

```bash
npm install
```

---

## Configuration

Create a `.env` file:

```env
DISCORD_TOKEN=your_discord_bot_token
```

Then edit the configuration inside `index.js`.

### Channel

```js
const CHANNEL_ID = "YOUR_CHANNEL_ID";
```

The Discord channel where live notifications will be posted.

### Ping Role

```js
const STREAM_PING_ROLE_ID = "YOUR_ROLE_ID";
```

The Discord role to mention whenever a stream begins.

### Check Interval

```js
const CHECK_INTERVAL_MS = 60_000;
```

How often the bot checks each streamer.

### Streamers

```js
const STREAMERS = [
  {
    username: "twowhitaker",
    name: "twoWhit",
    wasLive: null,
  },
];
```

Add as many streamers as you'd like.

---

## Running

Start the bot:

```bash
npm start
```

When the bot starts, it records each streamer's current status without sending notifications.

After initialization, it continuously checks for status changes. Whenever a streamer transitions from **offline** to **live**, the bot posts a notification similar to:

```text
@stream ping

🔴 twoWhit is LIVE!
https://www.tiktok.com/@twowhitaker/live
```

No additional notification will be sent until that streamer goes offline and starts another livestream.

---

## Project Structure

```text
.
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Dependencies

- discord.js
- dotenv

---

## License

ISC
