import { wordifyTimeframe } from "@/lib/timeframe";
import { getRandomAction, ActionType } from "@/lib/action";

export default function HealthCheck({ lastPing }: { lastPing: string }) {
  const lastPingDate = new Date(lastPing);
  const { type, action, opinion } = getRandomAction(lastPingDate);

  return (
    <div className="mt-[15vh] text-[10vw] lg:text-[8vw] uppercase leading-none text-left">
      <div className="after:content-[',']">
        {action + " "}
        <span className={`underline decoration-${type}-1 decoration-[0.8vw] lg:decoration-[0.6vw]`}>
          {wordifyTimeframe(lastPingDate)}
        </span>
      </div>
      <div
        className={opinion === "maybe" ? "after:content-['?']" : "after:content-['.']"}
      >
        <span
          className={`underline decoration-${type}-2 decoration-[0.8vw] lg:decoration-[0.6vw]`}
        >
          {opinion}
        </span>
      </div>
    </div>
  );
}
