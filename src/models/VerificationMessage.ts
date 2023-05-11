import { VerificationType } from 'helpers/requestSignature'

type VerificationMessage = { type: VerificationType; params: object }

export default VerificationMessage
