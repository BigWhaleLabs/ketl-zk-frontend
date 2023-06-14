import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'

interface CreateProofParams {
  password: string
  id: VerificationId
  type: VerificationType
}

export default CreateProofParams
