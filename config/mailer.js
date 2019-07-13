const nodemailer = require("nodemailer");
const logger = require("./logger");
const messages = require("./messages");

const sendMail = async (recipients, subject, message) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: recipients,
      subject,
      html: message
    });

    logger.info(`Mail Service: Message sent ${info.messageId} to ${recipients}`);
  } catch (error) {
    logger.error(`Error sending mail to: ${recipients}`);
  }
};

module.exports = { sendMail, messages };
