import { VerificationId, VerificationType } from 'helpers/requestSignature'

interface CreateProofParams {
  message?: string[]
  signature?: string
  token?: string
  id: VerificationId
  type: VerificationType
}

export default CreateProofParams
