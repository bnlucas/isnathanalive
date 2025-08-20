import { wordify } from '@/lib/wordify';

/** Number of milliseconds in a single day */
const DAY_IN_MS: number = 24 * 60 * 60 * 1000;

/**
 * Returns a new Date at the start of the local day (00:00:00) for a given date.
 *
 * @param date - The input date
 * @returns A Date object representing midnight of the same day
 */
function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Calculates the number of months between two dates (ignores days).
 *
 * @param a - Start date
 * @param b - End date
 * @returns Number of months between a and b
 */
function monthsBetween(a: Date, b: Date): number {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  );
}

/**
 * Calculates full months between two dates, adjusting if the day of b
 * is before the day of a in the month.
 *
 * @param a - Start date
 * @param b - End date
 * @returns Full months between the dates (never negative)
 */
function fullMonthsBetween(a: Date, b: Date): number {
  let months = monthsBetween(a, b);
  if (b.getDate() < a.getDate()) months -= 1;

  return Math.max(0, months);
}

/**
 * Returns the number of full days since a given date.
 *
 * @param since - The date (or timestamp) to measure from
 * @param now - Optional comparison date, defaults to current date
 * @returns Number of days since the given date
 *
 * @example
 * daysSince(new Date('2025-08-01')); // e.g., 18
 */
export function daysSince(
  since: Date | number,
  now: Date = new Date()
): number {
  const a = startOfLocalDay(new Date(since));
  const b = startOfLocalDay(now);

  return Math.round((b.getTime() - a.getTime()) / DAY_IN_MS);
}

/**
 * Converts a date into a human-readable timeframe string.
 *
 * Examples of outputs:
 * - "today"
 * - "yesterday"
 * - "3 days"
 * - "over a month"
 * - "5 months"
 * - "over a year"
 * - "2 years"
 *
 * @param since - The past date (or timestamp) to convert
 * @param now - Optional current date, defaults to now
 * @returns A readable string describing the time elapsed
 *
 * @example
 * wordifyTimeframe(new Date('2025-08-01')); // "17 days"
 */
export function wordifyTimeframe(
  since: Date | number,
  now: Date = new Date()
): string {
  const last = new Date(since);
  if (isNaN(last.getTime())) return '';

  const a = startOfLocalDay(last);
  const b = startOfLocalDay(now);

  const dayDiff = Math.round((b.getTime() - a.getTime()) / DAY_IN_MS);

  if (dayDiff <= 0) return 'today';
  if (dayDiff === 1) return 'yesterday';

  const months = fullMonthsBetween(a, b);

  if (months === 0) {
    return `${wordify(dayDiff)} day${dayDiff === 1 ? '' : 's'}`;
  }

  if (months === 1) return 'over a month';
  if (months < 12) return `${wordify(months)} months`;

  const years = Math.floor(months / 12);

  if (years === 1) return 'over a year';
  return `${wordify(years)} years`;
}
