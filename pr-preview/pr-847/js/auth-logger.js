const PREFIX = '[auth-service]'

function formatContext(context) {
  return context ? `${PREFIX}:${context}` : PREFIX
}

export function logAuthWarning(context, message, meta) {
  const label = formatContext(context)
  if (meta) {
    console.warn(`${label} ${message}`, meta)
  } else {
    console.warn(`${label} ${message}`)
  }
}

export function logAuthError(context, error, meta) {
  const label = formatContext(context)
  if (!error) {
    console.error(`${label} Unknown auth error`, meta)
    return
  }
  if (meta) {
    console.error(`${label} ${error.message || error}`, meta)
  } else {
    console.error(`${label} ${error.message || error}`)
  }
}

export function logAuthInfo(context, message, meta) {
  const label = formatContext(context)
  if (meta) {
    console.info(`${label} ${message}`, meta)
  } else {
    console.info(`${label} ${message}`)
  }
}
