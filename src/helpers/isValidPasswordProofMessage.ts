import CreatePasswordProofParams from 'models/CreatePasswordProofParams'

export default function isValidPasswordProofMessage(
  params: object
): params is CreatePasswordProofParams {
  return (
    'message' in params &&
    'id' in params &&
    'password' in params &&
    'entanglement' in params &&
    'attestationHash' in params
  )
}
