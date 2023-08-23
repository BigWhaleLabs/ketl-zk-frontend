import AttestationType from 'models/AttestationType'
import VerificationType from 'models/VerificationType'

interface ValidateProofParams {
  token?: string
  email?: string
  id: AttestationType
  type: VerificationType
}

export default ValidateProofParams
