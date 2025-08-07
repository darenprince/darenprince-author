const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const { to, subject, html } = JSON.parse(event.body);
  if (!to || !subject || !html) return { statusCode: 400, body: 'Missing email payload.' };

  try {
    await sgMail.send({ to, from: process.env.SENDGRID_FROM_EMAIL, subject, html });
    return { statusCode: 200, body: 'Email sent!' };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
