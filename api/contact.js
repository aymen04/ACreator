const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  const telegramMessage = `Nouveau message de ${name} (${email}):\nSujet: ${subject}\nMessage: ${message}`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: telegramMessage
    });

    res.status(200).json({ message: 'Message envoyé à Telegram' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message à Telegram' });
  }
};
