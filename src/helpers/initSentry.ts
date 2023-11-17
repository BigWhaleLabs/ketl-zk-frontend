import * as Sentry from '@sentry/react'
import env from 'helpers/env'

export function initSentry() {
  Sentry.init({
    dsn: env.VITE_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
}

export default Sentry
