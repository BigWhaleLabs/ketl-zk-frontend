import ValidateProofParams from 'models/ValidateProofParams'

export default function isValidParams(
  params: object
): params is ValidateProofParams {
  return 'type' in params && 'id' in params
}
