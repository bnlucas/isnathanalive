import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_ENDPOINT!,
  token: process.env.UPSTASH_TOKEN!,
});

export async function getLastPing(): Promise<Date | null> {
  try {
    const result = await redis.get<string>("last_ping");

    if (result) return new Date(result);

    return null;
  } catch (err) {
    console.error("Upstash error:", err);
    return null;
  }
}

export async function setLastPing(): Promise<void> {
  try {
    await redis.set("last_ping", new Date().toISOString());
  } catch (err) {
    console.error("Upstash error: Failed to set last ping", err);
  }
}
