# I'm Alive, I Swear!

This is a small, tongue-in-cheek web app for my friends and family who, bless their hearts, worry about me living alone. Instead of having to constantly message them back, this site provides a real-time status update to prove I'm still mobile and kickin.

It's a simple, low-tech way to say: "Hey, I'm alive, don't worry!"

---

## See it in action

Curious to see if I'm still kickin? Head over to **[isnathanalive.com](https://isnathanalive.com)**.

---

## How it Works

The site uses a simple motion sensor in my garage. When I walk by, it sends a webhook to a serverless function hosted on Vercel. This function updates a timestamp in an Upstash Redis database.

The frontend of the site then reads this timestamp and displays a short, humorous message about how long it's been since the last "ping."

---

## Key Technologies

- **Next.js**: The frontend framework for a fast, modern web experience.
- **Upstash Redis**: A serverless, globally distributed Redis database for storing the single timestamp.
- **Vercel**: The platform hosting both the Next.js app and the serverless API endpoint.
- **Motion Sensor**: The physical trigger that sends the initial ping.
- **Webhooks**: The magical glue that connects the motion sensor to the serverless function.

---

## Setup

1.  **Clone the Repository**:

    ```bash
    git clone [your-repo-link]
    cd [your-repo-name]
    ```

2.  **Environment Variables**:
    You'll need a `.env.local` file with your Upstash Redis credentials.

    ```bash
    UPSTASH_REDIS_REST_URL="your_upstash_redis_url"
    UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
    ```

3.  **Install Dependencies**:

    ```bash
    npm install
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

---

## Webhook Configuration

Configure your motion sensor to send a `POST` request to `[your-domain.com]/api/ping`. The API endpoint will automatically update the timestamp in Redis.

Example webhook URL: `https://im-alive-iswear.vercel.app/api/ping`

---

## Why?

This project is a lighthearted way to address a serious, but well-meaning, concern from loved ones. It replaces constant check-ins with a quick, reassuring glance at a website, giving everyone some peace of mind.
