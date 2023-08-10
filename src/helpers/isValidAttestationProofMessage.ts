import CreateProofParams from 'models/CreateProofParams'
import VerificationList from 'models/VerificationList'

export default function isValidAttestationProofMessage(
  params: object
): params is CreateProofParams {
  return (
    'type' in params &&
    'id' in params &&
    VerificationList.includes(params.id as number) &&
    'password' in params
  )
}
