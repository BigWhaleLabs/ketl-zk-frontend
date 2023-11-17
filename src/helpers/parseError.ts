import { isAxiosError } from 'axios'

interface MessageObject {
  message: string
}

export function stringifyError(e: unknown) {
  if (typeof e === 'undefined') return e
  if (typeof e === 'string') return e
  if (isAxiosError(e) && e.response?.data?.message)
    return e.response?.data?.message
  if (e instanceof Error || isMessageObject(e)) return e.message
  return e
}

function isMessageObject(e: unknown): e is MessageObject {
  return (e as MessageObject)?.message !== undefined
}

export default function parseError(e: unknown, fallbackError?: string) {
  const result = stringifyError(e)
  return typeof result === 'string'
    ? result
    : fallbackError || 'An unknown error occurred, check the logs'
}
