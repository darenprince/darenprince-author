import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  const { to, subject, text } = JSON.parse(event.body || '{}');
  if (!to || !subject || !text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('SendGrid error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' })
    };
  }
};
