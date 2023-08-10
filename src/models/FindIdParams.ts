import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'

interface FindIdParams {
  token?: string
  email?: string
  accountTypes?: VerificationId[]
  type: VerificationType
}

export default FindIdParams
