const nodemailer = require('nodemailer');

const { user, pass } = process.env;

async function createAccount() {
  try {
    const transporter = nodemailer.createTransport({
      name: 'secretsanta',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user,
        pass,
      },
    });

    return transporter;
  } catch (error) {
    global.logger.error(error.message);
  }
}

function generateConfig(group, member) {
  const html = `
  <p> Hello ${member.name}, <p>
  <p> ${group.user.name} created a Secret Santa event and has listed you as participant. <p>
  <p> You can spent up to ${group.maxPrice} £ for your gift.
  <p> The Secret Santa Party is planned ${group.date.toUTCString()} and will take place at/in ${group.location}. <p>
  <p> Be sure to bring your gift. <p>
  <p> You are assigned as Secret Santa to give a present to: <p>
  <h2> ${member.giftTo} <h2>
  `;

  const config = {
    from: 'Secret Santa <secretsanta@example.com>',
    to: member.email,
    subject: 'Secret Santa',
    html,
  };

  return config;
}

async function sendEmail(transporter, config) {
  try {
    const info = await transporter.sendMail(config);
    return info;
  } catch (error) {
    global.logger.error(error.message);
  }
}

module.exports = { createAccount, generateConfig, sendEmail };
