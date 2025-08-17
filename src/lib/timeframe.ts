import { wordify } from "@/lib/wordify";

const DAY_IN_MS: number = 24 * 60 * 60 * 1000;

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function monthsBetween(a: Date, b: Date): number {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  );
}

function fullMonthsBetween(a: Date, b: Date): number {
  let months = monthsBetween(a, b);
  if (b.getDate() < a.getDate()) months -= 1;

  return Math.max(0, months);
}

export function daysSense(
  since: Date | number,
  now: Date = new Date()
): number {
  const a = startOfLocalDay(new Date(since));
  const b = startOfLocalDay(now);

  return Math.round((b.getTime() - a.getTime()) / DAY_IN_MS);
}

export function wordifyTimeframe(
  since: Date | number,
  now: Date = new Date()
): string {
  const last = new Date(since);
  if (isNaN(last.getTime())) return "";

  const a = startOfLocalDay(last);
  const b = startOfLocalDay(now);

  const dayDiff = Math.round((b.getTime() - a.getTime()) / DAY_IN_MS);

  if (dayDiff <= 0) return "today";
  if (dayDiff === 1) return "yesterday";

  const months = fullMonthsBetween(a, b);

  if (months === 0) {
    return `${wordify(dayDiff)} day${dayDiff === 1 ? "" : "s"}`;
  }

  if (months === 1) return "over a month";
  if (months < 12) return `${wordify(months)} months`;

  const years = Math.floor(months / 12);

  if (years === 1) return "over a year";
  return `${wordify(years)} years`;
}
