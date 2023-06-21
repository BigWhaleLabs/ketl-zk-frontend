import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'

interface ValidateProofParams {
  token?: string
  email?: string
  id: VerificationId
  type: VerificationType
}

export default ValidateProofParams
