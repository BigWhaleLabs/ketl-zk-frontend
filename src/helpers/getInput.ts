import { getMerkleTreeInputs } from 'helpers/getMerkleTreeProof'
import hashByPoseidon from 'helpers/hashByPoseidon'

export default async function getInput(id: string, ids: string[]) {
  const hashFunc = await hashByPoseidon()

  if (!ids.includes(id)) throw new Error('Invitation not found!')

  return getMerkleTreeInputs(20, hashFunc, id, ids)
}
