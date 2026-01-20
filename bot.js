const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '7692859653:AAE_8ddxOhqdjiqV8nJMQCp1ud46jvSGlDE';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const user = msg.from;

    // Ma'lumotni Vercel API'ga yuborish
    await axios.post('', {
        userId: user.id,
        username: user.username,
        firstName: user.first_name,
        text: text,
        timestamp: new Date().toISOString()
    });

    bot.sendMessage(chatId, 'Xabaringiz qabul qilindi!');
});