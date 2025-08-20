/**
 * A small lookup array for numbers 0–20 (and 30) as words.
 * Used to convert small numeric values into human-readable strings.
 */
const WORDS: string[] = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'thirty',
];

/**
 * Converts a number into its word representation if it is between 0 and 20 (inclusive),
 * otherwise returns the numeric string.
 *
 * @param num - The number to convert to a word.
 * @returns The word representation of the number if 0–20, otherwise the number as a string.
 *
 * @example
 * wordify(3);    // "three"
 * wordify(15);   // "fifteen"
 * wordify(30);   // "30" (fallback to numeric string)
 * wordify(42);   // "42"
 */
export function wordify(num: number): string {
  return num >= 0 && num <= 20 ? WORDS[num] : num.toString();
}
