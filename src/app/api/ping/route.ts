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
): Promise<NextResponse<PostResponse> | NextResponse> {
  const authorizationHeader = request.headers.get("Authorization");

  if (authorizationHeader !== `Bearer ${process.env.API_TOKEN}`) {
    console.log(`Expected: Bearer ${process.env.API_TOKEN}`);
    console.log(`Actual:   ${authorizationHeader}`);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await setLastPing();
  return NextResponse.json<PostResponse>({ ok: true });
}
