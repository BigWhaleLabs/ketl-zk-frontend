import { buildPoseidon } from 'circomlibjs'
import { getMerkleTreeInputs } from 'helpers/getMerkleTreeProof'

export default async function getAllowMapInput(
  token: string,
  hashes: string[]
) {
  const poseidon = await buildPoseidon()
  function hashFunc(values: string[]) {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }
  const hashedToken = hashFunc([token])

  return {
    leaf: token.toString(),
    ...(await getMerkleTreeInputs(15, hashFunc, hashedToken, hashes)),
  }
}
