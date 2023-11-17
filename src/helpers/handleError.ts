import Sentry from 'helpers/initSentry'
import parseError from 'helpers/parseError'

export default function handleError({
  e,
  sendToSentry = true,
}: {
  e: unknown
  sendToSentry?: boolean
}) {
  console.error('Handled error\n', e)

  const message = parseError(e)
  if (sendToSentry) {
    if (e instanceof Error) {
      console.log('catch')
      Sentry.captureException(e)
    } else {
      Sentry.captureException(new Error(message, { cause: e }))
    }
  }
}
