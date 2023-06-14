import VerificationId from 'models/VerificationId'

interface CreatePasswordProofParams {
  message: string[]
  id: VerificationId
  password: string
  entanglement: string
  attestationHash: string
}

export default CreatePasswordProofParams
