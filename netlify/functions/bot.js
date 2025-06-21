const TelegramBot = require('node-telegram-bot-api');

// Get the secret bot token and web app URL from Netlify's environment variables
const TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

// This is the main function that Netlify will run
exports.handler = async (event) => {
  try {
    const bot = new TelegramBot(TOKEN);
    
    // Parse the message body from the event
    const body = JSON.parse(event.body);
    const chatId = body.message.chat.id;
    const text = body.message.text;

    // Check if the command is /start
    if (text === '/start') {
      // Send a welcome message with the button to open the web app
      await bot.sendMessage(chatId, 'Welcome! Click the button below to launch the app.', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🚀 Launch App', web_app: { url: WEB_APP_URL } }]
          ],
        },
      });
    }

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message processed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process message' }),
    };
  }
};
