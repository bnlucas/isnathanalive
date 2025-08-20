import HealthCheck from "@/components/health";
import LastUpdate from "@/components/update";
import { getLastPing } from "@/lib/upstash";

export default async function Home() {
  let lastPing: Date | null = null;

  try {
    lastPing = await getLastPing();
  } catch (err) {
    console.error(err);
  }

  if (!lastPing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[8vw] text-center uppercase leading-none text-red-500 p-[6rem]">
        Uh oh. The wires are crossed. The system is offline. Maybe try yelling 'Hello?' at your screen.
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute flex flex-col items-center justify-center min-h-screen">
      <HealthCheck lastPing={lastPing.toISOString()} />
      <LastUpdate lastPing={lastPing.toISOString()} />
    </div>
  );
}
