"use client";

import { useEffect, useState } from "react";
import { daysSense, wordifyTimeframe } from "@/lib/timeframe";

export default function Home() {
  const [lastPing, setLastPing] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLastPing() {
      try {
        const res = await fetch("/api/ping");
        if (!res.ok) {
          throw new Error("Failed to fetch last ping.");
        }

        const data = await res.json();
        const lastPingDate = data.last_ping ? new Date(data.last_ping) : null;

        if (lastPingDate) {
          setLastPing(lastPingDate);
        } else {
          setError(
            "Well, this is awkward... Maybe I'm just living in the shadows."
          );
        }
      } catch (err) {
        console.error("Failed to fetch last ping:", err);
        setError(
          "Uh oh. The wires are crossed. The system is offline. Maybe try yelling 'Hello?' at your screen."
        );
      }
    }

    fetchLastPing();
  }, []);

  if (error) {
    return (
      <div className="text-[14vw] md:text-[10vw] lg:text-[8vw] text-center uppercase leading-none text-red-500 p-[6rem]">
        {error}
      </div>
    );
  }

  if (!lastPing) return null;

  const days = daysSense(lastPing);

  let opinion = "def dead";
  if (days <= 6) opinion = "maybe";
  if (days <= 2) opinion = "still kickin";

  const action = `${days <= 1 ? "got dunks" : "no dunks in"} `;

  return (
    <div className="text-[14vw] md:text-[10vw] lg:text-[8vw] uppercase leading-none text-left mt-[20vh]">
      <div className="after:content-[',']">
        {action}
        <span className="underline decoration-pink decoration-[0.6vw]">
          {wordifyTimeframe(lastPing)}
        </span>
      </div>
      <div
        className={opinion === "maybe" ? "after:content-['?']" : "after:content-['.']"}
      >
        <span
          className="underline decoration-orange decoration-[0.6vw]"
        >
          {opinion}
        </span>
      </div>
    </div>
  );
}
