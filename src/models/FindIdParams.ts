import VerificationType from 'models/VerificationType'

interface FindIdParams {
  token?: string
  email?: string
  type: VerificationType
}

export default FindIdParams
