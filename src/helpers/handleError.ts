export default function handleError(error: unknown) {
  let output = ''
  if (error instanceof Error) output = error.message
  if (typeof error === 'string') output = error

  if (output.includes('to BigInt') || output.includes('invalid BigInt'))
    return 'Please provide a valid token'
  if (output.includes('The leaf')) return "Looks like you're not invited"
  return output
}
