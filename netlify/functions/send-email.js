import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? '';
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL ?? '';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
    console.error('SendGrid environment variables are not configured.');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email service is not configured' })
    };
  }

  let body;
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    console.warn('Invalid JSON payload for send-email function', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON payload' })
    };
  }

  const { to, subject, text } = body;
  if (!to || !subject || !text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }

  const msg = {
    to,
    from: SENDGRID_FROM_EMAIL,
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
