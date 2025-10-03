import sgMail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? ''
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL ?? ''
const CONTACT_TO_EMAIL =
  process.env.SENDGRID_CONTACT_TO ?? process.env.SENDGRID_TO_EMAIL ?? SENDGRID_FROM_EMAIL

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
    console.error('SendGrid environment variables are not configured.')
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email service is not configured' }),
    }
  }

  let body
  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch (error) {
    console.warn('Invalid JSON payload for send-email function', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON payload' }),
    }
  }

  let to = body.to
  let subject = body.subject
  let text = body.text
  let replyTo

  const hasDirectPayload = to && subject && text
  const hasContactPayload = body.name && body.email && body.message

  if (!hasDirectPayload && !hasContactPayload) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    }
  }

  if (hasContactPayload) {
    if (!CONTACT_TO_EMAIL) {
      console.error('SENDGRID_CONTACT_TO or SENDGRID_TO_EMAIL is not configured.')
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Email service is not configured' }),
      }
    }

    const topic = body.topic ? String(body.topic).trim() : 'General Inquiry'
    const urgency = body.urgency ? String(body.urgency).trim() : 'standard'
    const channel = body.channel ? String(body.channel).trim() : ''
    const source = body.source ? String(body.source).trim() : 'contact-form'

    to = CONTACT_TO_EMAIL
    subject = subject || `New ${topic} from ${body.name}`
    replyTo = body.email

    const lines = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Topic: ${topic}`,
      `Urgency: ${urgency}`,
      channel ? `Preferred Channel: ${channel}` : null,
      `Source: ${source}`,
      '',
      'Message:',
      body.message,
    ].filter(Boolean)

    text = lines.join('\n')
  }

  const msg = {
    to,
    from: SENDGRID_FROM_EMAIL,
    subject,
    text,
    replyTo,
    html: text
      ? text
          .split('\n')
          .map((line) => (line.trim() ? `<p>${line}</p>` : '<br />'))
          .join('')
      : undefined,
  }

  if (!msg.replyTo) {
    delete msg.replyTo
  }
  if (!msg.html) {
    delete msg.html
  }

  try {
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    }
  } catch (error) {
    console.error('SendGrid error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    }
  }
}
