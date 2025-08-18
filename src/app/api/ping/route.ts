import { getLastPing, setLastPing } from "@/lib/upstash";
import { NextResponse } from "next/server";

type GetResponse = {
  last_ping: Date | null;
};

type PostResponse = {
  ok: boolean;
};

export async function GET(): Promise<NextResponse<GetResponse>> {
  const lastPing = await getLastPing();
  return NextResponse.json<GetResponse>({ last_ping: lastPing });
}

export async function POST(
  request: Request
): Promise<NextResponse> {
  const url = new URL(request.url);
  const token = url.searchParams.get("api_token");

  if (token !== process.env.API_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let body: any;

  try {
    body = await request.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { eventType, context } = body || {};

  if (
    eventType === "changeReport" &&
    context?.deviceType === "WoPresence" &&
    context?.detectionState === "DETECTED"
  ) {
    await setLastPing();
    return NextResponse.json({ ok: true, updated: true });
  }

  return NextResponse.json({ ok: true, updated: false });
}
