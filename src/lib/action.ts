import { daysSince } from './timeframe';

/**
 * The set of supported action types for the health check.
 */
type ActionType = 'dunkin' | 'smoke' | 'mail' | 'outside';

/**
 * Defines the text for an action type, with separate messages
 * for when the action is recent (active) or older (inactive).
 */
interface ActionPhrase {
  /** The action type */
  type: ActionType;
  /** Message to display when the action occurred recently (0–2 days) */
  active: string;
  /** Message to display when the action has not occurred recently (3+ days) */
  inactive: string;
}

/**
 * Represents a randomized action to display, including its
 * type, the action text, and the opinion about the timeframe.
 */
interface Action {
  /** The action type */
  type: ActionType;
  /** Text describing the action itself */
  action: string;
  /** Opinion text based on how long ago it occurred */
  opinion: string;
}

/**
 * Predefined set of actions with active/inactive messages.
 * These are used to generate random health check phrases.
 */
const ACTION_PHRASES: ActionPhrase[] = [
  {
    type: 'dunkin',
    active: 'got dunks', // got dunks {today, yesterday}
    inactive: 'no dunks in', // no dunks in {3...} days
  },
  {
    type: 'smoke',
    active: 'smoke break', // smoke break {today, yesterday}
    inactive: 'no puffs in', // no puffs in {3...} days
  },
  {
    type: 'mail',
    active: 'got the mail', // got the mail {today, yesterday}
    inactive: 'no mail in', // no mail in {3...} days
  },
  {
    type: 'outside',
    active: 'went outside', // went outside {today, yesterday}
    inactive: 'stayed in for', // stayed in for {3...} days
  },
];

/**
 * Returns a randomized action for display in the health check.
 * Chooses a random action type, then determines the action/opinion
 * text based on how many days have passed since the last ping.
 *
 * @param lastPing - The Date of the last detected motion
 * @returns An Action object containing type, action text, and opinion
 *
 * @example
 * const { type, action, opinion } = getRandomAction(new Date('2025-08-01'));
 * // type: "dunkin"
 * // action: "got dunks" or "no dunks in"
 * // opinion: "still kickin", "maybe", or "def dead"
 */
export function getRandomAction(lastPing: Date): Action {
  const days = daysSince(lastPing);

  // Pick a random action phrase
  const { type, active, inactive } =
    ACTION_PHRASES[Math.floor(Math.random() * ACTION_PHRASES.length)];

  // Determine opinion based on days since last ping
  let opinion = 'def dead';
  if (days <= 6) opinion = 'maybe';
  if (days <= 2) opinion = 'still kickin';

  return {
    type,
    action: days <= 2 ? active : inactive,
    opinion,
  };
}
