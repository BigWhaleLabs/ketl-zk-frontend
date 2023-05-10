export default function isDataInMessage(message: unknown) {
  return typeof message === 'object' && message && 'data' in message
}
