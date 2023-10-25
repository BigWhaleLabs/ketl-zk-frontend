import AttestationType from 'models/AttestationType'
import MerkleTreeInputs from 'models/MerkleTreeInputs'

interface CreateProofParams {
  password: string
  id: AttestationType
  merkleTreeInputs?: MerkleTreeInputs
}

export default CreateProofParams
