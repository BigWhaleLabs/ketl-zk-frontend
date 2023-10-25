import PublicKey from 'models/PublicKey'

export default interface Signature {
  signature: string
  message: string[]
  publicKey?: PublicKey
}
