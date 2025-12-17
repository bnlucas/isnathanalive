import { getLastPing } from '@/lib/upstash';
import { NextResponse } from 'next/server';

/**
 * Response shape for GET requests.
 */
type GetResponse = {
  /** The last recorded ping timestamp, or null if none exists */
  last_ping: Date | null;
};

/**
 * Response shape for POST requests.
 */
type PostResponse = {
  /** Indicates if the request itself was valid */
  ok: boolean;
  /** Indicates if the last ping was updated */
  updated: boolean;
};

/**
 * Structure of the SwitchBot motion event sent via webhook.
 */
interface SwitchBotMotionEvent {
  eventType: string;
  eventVersion: string;
  context: {
    deviceType: string;
    deviceMac: string;
    detectionState: 'DETECTED' | 'NOT_DETECTED';
    battery: number;
    timeOfSample: number;
  };
}

/**
 * Handles GET requests to fetch the last recorded ping.
 * Typically used for SSR or frontend health check display.
 *
 * @returns JSON containing `last_ping` (Date | null)
 *
 * @example
 * GET /api/ping → { last_ping: "2025-08-19T14:00:00.000Z" }
 */
export async function GET(): Promise<NextResponse<GetResponse>> {
  const lastPing = await getLastPing();
  return NextResponse.json<GetResponse>({ last_ping: lastPing });
}

/**
 * Handles POST requests from the SwitchBot webhook.
 * Updates the last ping timestamp only when:
 * - The `api_token` matches the server token
 * - The event is a `WoPresence` motion detection
 *
 * @param request - Incoming webhook POST request
 * @returns JSON indicating whether the request was valid and if the ping was updated
 *
 * @example
 * POST /api/ping?api_token=SECRET
 * Body: { eventType: "changeReport", context: { ... } }
 * → { ok: true, updated: true }
 */
export async function POST(
  request: Request
): Promise<NextResponse<PostResponse>> {
  const url = new URL(request.url);
  const token = url.searchParams.get('api_token');

  // Reject if the token is invalid
  if (token !== process.env.API_TOKEN) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let body: SwitchBotMotionEvent;

  try {
    body = await request.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  console.log('Switchbot ', { body });
  const { eventType, context } = body || {};

  // Only update if the event is a motion detection
  if (
    eventType === 'changeReport' &&
    context?.deviceType === 'WoPresence' &&
    context?.detectionState === 'DETECTED'
  ) {
    // await setLastPing();
    return NextResponse.json({ ok: true, updated: true });
  }

  // If event type/context doesn't match, do not update
  return NextResponse.json({ ok: true, updated: false });
}
