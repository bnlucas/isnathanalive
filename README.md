# I'm Alive, I Swear!

This is a small, tongue-in-cheek web app for my friends and family who, bless their hearts, worry about me living alone. Instead of answering the same "You good?" text ten times a day, this site lets them check for themselves whether I’m still up and moving around.

It’s a funny little system that proves I’m alive, with a healthy dose of Dunkin’ Donuts jokes along the way.

👉 **See it live:** [isnathanalive.com](https://isnathanalive.com)

---

## How It Works

1. **Motion detected**
   I have a [SwitchBot Motion Sensor](https://www.switch-bot.com/products/motion-sensor) and Hub Mini in my garage. When I walk past it, the sensor fires a `WoPresence (DETECTED)` event.

2. **Webhook fired**
   The SwitchBot Hub calls a webhook endpoint:

   ```
   POST https://your-domain.com/api/ping?api_token=SECRET
   ```

   Only motion events are processed.

3. **Redis updated**
   The serverless API (running on Vercel) filters the event, then writes a single key (`last_ping`) to **Upstash Redis** with the current timestamp.

4. **Funny status rendered**
   The Next.js frontend reads `last_ping` and turns it into a big, ridiculous status message:

   * *“got dunks 2 days ago, still kickin.”*
   * *“no dunks in 7 days, def dead.”*

   It’s basically a health check with extra sass.

---

## Example Webhook Payload

Here’s a typical webhook event SwitchBot sends. Only `WoPresence-DETECTED` matters:

```json
{
    "eventType": "changeReport",
    "eventVersion": "1",
    "context": {
        "deviceType": "WoPresence",
        "deviceMac": DEVICE_MAC_ADDR,
        "detectionState": "DETECTED",
        "battery":100,
        "timeOfSample": 123456789
    }
}
```

---

## Key Technologies

* **Next.js** – frontend framework powering the UI
* **Vercel** – hosting + serverless API routes
* **Upstash Redis** – cloud database for storing `last_ping`
* **SwitchBot Motion Sensor + Hub** – the physical trigger
* **Webhooks** – connecting SwitchBot events → API → Redis

---

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/bnlucas/isnathanalive.git
   cd isnathanalive
   ```

2. **Environment variables**
   Create `.env.local`:

   ```env
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

   SWITCH_BOT_TOKEN=your_switch_bot_token
   SWITCH_BOT_SECRET=your_switch_bot_secret

   HOST=https://your-site.com
   API_TOKEN=super_secret_token
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

---

## Webhook Registration

SwitchBot webhooks can be registered automatically with:

```bash
node scripts/registerSwitchBotWebhook.js
```

This script uses your SwitchBot API credentials to register the webhook pointing at:

```
https://your-site.com/api/ping?api_token=super_secret_token
```

---

## Why?

This project is half practical, half comedy.
It reassures my loved ones without endless texts and calls, and it makes me laugh every time I see *“no dunks in 3 days, maybe.”*
