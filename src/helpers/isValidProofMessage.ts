import CreateProofParams from 'models/CreateProofParams'

export default function isValidProofMessage(
  params: object
): params is CreateProofParams {
  return 'type' in params
}
