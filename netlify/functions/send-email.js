const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, message } = data;
  const to = data.to || process.env.SENDGRID_TO_EMAIL || process.env.SENDGRID_FROM_EMAIL;
  const subject = data.subject || `New message from ${name || 'website visitor'}`;
  const html =
    data.html ||
    `<p><strong>Name:</strong> ${name || 'N/A'}</p>
     <p><strong>Email:</strong> ${email || 'N/A'}</p>
     <p><strong>Message:</strong><br>${(message || '').replace(/\n/g, '<br>')}</p>`;

  if (!to || !subject || !html) {
    return { statusCode: 400, body: 'Missing email payload.' };
  }

  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email,
      subject,
      html,
    });
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
