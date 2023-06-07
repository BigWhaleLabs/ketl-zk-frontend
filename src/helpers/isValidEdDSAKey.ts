import PublicKey from 'models/PublicKey'

export default function isValidEdDSAKey(data: object): data is PublicKey {
  return typeof data === 'object' && data && 'x' in data && 'y' in data
}
