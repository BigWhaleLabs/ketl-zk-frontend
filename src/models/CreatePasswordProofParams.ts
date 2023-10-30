import AttestationType from 'models/AttestationType'
import MerkleTreeInputs from 'models/MerkleTreeInputs'

interface CreatePasswordProofParams {
  isDev?: boolean
  message: string[]
  id: AttestationType
  password: string
  entanglement: string
  attestationHash: string
  merkleTreeInputs?: MerkleTreeInputs
}

export default CreatePasswordProofParams
