import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'

interface CreateProofParams {
  message?: string[]
  signature?: string
  token?: string
  ownerAddress?: string
  ownerMessage?: string
  ownerSignature?: string
  threshold?: number
  tokenAddress?: string
  password: string
  id?: VerificationId
  type: VerificationType
}

export default CreateProofParams
