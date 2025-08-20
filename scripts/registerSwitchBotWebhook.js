import 'dotenv/config';
import { SwitchBotOpenAPI } from 'node-switchbot';

/**
 * Host URL for your site, trimmed of any trailing slash.
 * Used to construct the webhook endpoint.
 */
const host = process.env.HOST?.replace(/\/$/, '');

/** Full webhook URL including the API token query parameter */
const webhookUrl = `${host}/api/ping?api_token=${process.env.API_TOKEN}`;

/** SwitchBot API client instance */
const switchBotAPI = new SwitchBotOpenAPI(
  process.env.SWITCH_BOT_TOKEN,
  process.env.SWITCH_BOT_SECRET,
);

/**
 * Registers the webhook with SwitchBot so that motion events
 * trigger the `/api/ping` endpoint of this application.
 *
 * - Logs success/failure to the console
 * - Exits the process after completion
 */
async function registerWebhook() {
  try {
    console.log('Registering webhook at:', webhookUrl);
    await switchBotAPI.setupWebhook(webhookUrl);

    console.log('Webhook registered successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to register webhook:', error);
    process.exit(1);
  }
}

// Execute the registration script
registerWebhook();
