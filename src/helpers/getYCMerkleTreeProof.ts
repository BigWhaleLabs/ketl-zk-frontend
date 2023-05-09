import { BigNumber } from 'ethers'
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { buildPoseidon } from 'circomlibjs'

export async function getYCMerkleTreeInputs(
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const proof = await getYCMerkleTreeProof(hashFunc, commitment, commitments)

  return {
    pathElements: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
    pathIndices: proof.pathIndices,
  }
}

export default function getYCMerkleTreeProof(
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const tree = new IncrementalMerkleTree(
    (values) => BigInt(hashFunc(values)),
    20,
    BigInt(0),
    2
  )

  commitments.forEach((c) => tree.insert(c))

  return tree.createProof(tree.indexOf(commitment))
}

export async function getYCAllowMapInput(id: string, ids: string[]) {
  const poseidon = await buildPoseidon()
  function hashFunc(values: string[]) {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }

  return getYCMerkleTreeInputs(hashFunc, id, ids)
}
