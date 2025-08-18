import 'dotenv/config';
import { SwitchBotOpenAPI } from 'node-switchbot';

const host = process.env.HOST?.replace(/\/$/, '');
const webhookUrl = `${host}/api/ping?api_token=${process.env.API_TOKEN}`;

const switchBotAPI = new SwitchBotOpenAPI(
  process.env.SWITCH_BOT_TOKEN,
  process.env.SWITCH_BOT_SECRET,
);

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

registerWebhook();