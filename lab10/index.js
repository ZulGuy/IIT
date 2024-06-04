import process from 'node:process';
import TelegramBot from 'node-telegram-bot-api';
import {wordCounter} from './metrics.js';


const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on('message', async (msg) => {
    const text = msg.text;
    let res = `I don't understand you :?`;
    if (text.startsWith('/metrics')) {
        const split = text.split(' ');
        const wordsNumber = split.filter((val, i) => i !== 0).length;
        wordCounter.inc(wordsNumber);
        res = `'${wordsNumber}' word(s) were logged`;
    }
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, res);
});
