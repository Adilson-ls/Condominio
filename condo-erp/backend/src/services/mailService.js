// ...existing code...
const nodemailer = require('nodemailer');

exports.sendMail = async (to, subject, text) => {
  // Exemplo simples, configure com variáveis de ambiente
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  await transporter.sendMail({ from: process.env.MAIL_USER, to, subject, text });
};
// ...existing code...
