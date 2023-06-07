import Signature from 'models/Signature'

export default function isValidSignature(data: object): data is Signature {
  return (
    typeof data === 'object' && data && 'message' in data && 'signature' in data
  )
}
