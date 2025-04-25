const TelegramBot = require('node-telegram-bot-api');

const token = '7536290975:AAE8iG5aoJ75NAtmRnWX7ToEj5mrWQtGxow';

const bot = new TelegramBot(token, { polling: true });

const allowedLang = ['id', 'id-ID'];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;
  const lang = msg.from.language_code;

  if (!allowedLang.includes(lang)) {
    bot.sendMessage(chatId, 'Maaf, bot ini hanya mendukung bahasa Indonesia 🇮🇩');
    return;
  }

  const welcomeMessage = `
*Nara188 Admin Bot* 🤖
Selamat Datang ${name} di *Nara188*! 🃏

🌟 *Produk Unggulan:*
🎰 Slot Online
🎲 Casino Live
🏆 Sportsbook
🕹️ Arcade Game

🎯 *Keunggulan Kami:*
✅ Sistem permainan transparan & terpercaya
🎁 Bonus harian dan event eksklusif untuk member
💬 Layanan pelanggan responsif 24/7

Ketik /menu untuk mulai atau pilih tombol di bawah ini untuk akses cepat!
`;

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔐 Login Sekarang', url: 'https://directnara.one' }],
        [{ text: '🌐 Link Alternatif', url: 'https://t.ly/loginnara188' }],
        [
          { text: '📞 Hubungi CS', url: 'https://t.me/official_nara188' },
          { text: '👥 Grup Resmi', url: 'https://t.me/Nara188_Group' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const lang = msg.from.language_code;

  if (!allowedLang.includes(lang)) return;

  const keyboard = {
    reply_markup: {
      keyboard: [
        ['📱 Unduh APK Resmi NARA188'],
        ['🎁 Lihat Promo & Bonus Terbaru'],
        ['🎯 Cek Bocoran Slot Gacor Hari Ini']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

  bot.sendMessage(chatId, 'Pilih salah satu menu di bawah ini:', keyboard);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();
  const lang = msg.from.language_code;

  if (!allowedLang.includes(lang)) return;

  if (text.includes('bocoran') || text.includes('rtp')) {
    bot.sendMessage(chatId, '📊 Bocoran Slot Gacor Hari Ini:\nhttps://t.ly/RTPNARA');
  } else if (text.includes('promo') || text.includes('bonus')) {
    bot.sendMessage(chatId, '🎁 Promo Hari Ini:\nhttps://t.ly/promonara188');
  } else if (text.includes('login') || text.includes('daftar') || text.includes('apk')) {
    bot.sendMessage(chatId, '📱 Download APK & Daftar:\nhttps://t.ly/apknara');
  }
});



