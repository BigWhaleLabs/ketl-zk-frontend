import AttestationType from 'models/AttestationType'
import VerificationType from 'models/VerificationType'

interface FindIdParams {
  token?: string
  email?: string
  accountTypes?: AttestationType[]
  type: VerificationType
}

export default FindIdParams
