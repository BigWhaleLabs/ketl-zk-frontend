import CreateProofParams from 'models/CreateProofParams'

export default function isValidAttestationProofMessage(
  params: object
): params is CreateProofParams {
  return 'type' in params && 'id' in params && 'password' in params
}
