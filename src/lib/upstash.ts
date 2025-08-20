import { Redis } from '@upstash/redis';

/**
 * Redis client instance configured with environment variables.
 *
 * Requires:
 * - UPSTASH_ENDPOINT: The REST URL of your Upstash Redis database.
 * - UPSTASH_TOKEN: The authentication token for Upstash Redis.
 */
const redis = new Redis({
  url: process.env.UPSTASH_ENDPOINT!,
  token: process.env.UPSTASH_TOKEN!,
});

/**
 * Retrieves the last recorded ping timestamp from Redis.
 *
 * @returns A Date object representing the last ping, or null if none exists or an error occurs.
 *
 * @example
 * const lastPing = await getLastPing();
 * if (lastPing) {
 *   console.log(`Last ping was at ${lastPing.toISOString()}`);
 * } else {
 *   console.log("No pings recorded yet.");
 * }
 */
export async function getLastPing(): Promise<Date | null> {
  try {
    const result = await redis.get<string>('last_ping');

    if (result) return new Date(result);

    return null;
  } catch (err) {
    console.error('Upstash error:', err);
    return null;
  }
}

/**
 * Sets the current timestamp as the latest ping in Redis.
 * Typically called when your sensor fires a webhook event.
 *
 * @returns void
 *
 * @example
 * await setLastPing();
 */
export async function setLastPing(): Promise<void> {
  try {
    await redis.set('last_ping', new Date().toISOString());
  } catch (err) {
    console.error('Upstash error: Failed to set last ping', err);
  }
}
