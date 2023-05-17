import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'

interface CreateProofParams {
  message?: string[]
  signature?: string
  token?: string
  id: VerificationId
  type: VerificationType
}

export default CreateProofParams
