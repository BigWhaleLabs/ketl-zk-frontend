import AttestationType from 'models/AttestationType'

interface CreatePasswordProofParams {
  isDev?: boolean
  message: string[]
  id: AttestationType
  password: string
  entanglement: string
  attestationHash: string
}

export default CreatePasswordProofParams
