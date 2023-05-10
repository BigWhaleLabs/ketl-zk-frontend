import { buildPoseidon } from 'circomlibjs'
import { getMerkleTreeInputs } from 'helpers/getMerkleTreeProof'

export default async function getYCInput(id: string, ids: string[]) {
  const poseidon = await buildPoseidon()
  function hashFunc(values: string[]) {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }

  return getMerkleTreeInputs(20, hashFunc, id, ids)
}
