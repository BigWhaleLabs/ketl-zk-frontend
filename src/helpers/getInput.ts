import { buildPoseidon } from 'circomlibjs'
import { getMerkleTreeInputs } from 'helpers/getMerkleTreeProof'

export default async function getInput(id: string, ids: string[]) {
  const poseidon = await buildPoseidon()
  function hashFunc(values: string[]) {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }

  if (!ids.includes(id)) throw new Error('Invitation not found!')

  return getMerkleTreeInputs(20, hashFunc, id, ids)
}
