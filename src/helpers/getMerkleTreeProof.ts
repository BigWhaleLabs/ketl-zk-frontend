import { BigNumber } from 'ethers'
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { buildPoseidon } from 'circomlibjs'
import { randomBytes } from 'crypto-browserify'

export async function getMerkleTreeInputs(
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const proof = await getMerkleTreeProof(commitment, commitments)

  return {
    pathIndices: proof.pathIndices,
    pathElements: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
  }
}

export default async function getMerkleTreeProof(
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const poseidon = await buildPoseidon()
  const F = poseidon.F
  const tree = new IncrementalMerkleTree(
    (values) => BigInt(F.toString(poseidon(values))),
    15,
    BigInt(0),
    2
  )
  commitments.forEach((c) => tree.insert(c))

  return tree.createProof(tree.indexOf(commitment))
}

export async function getAllowMapInput() {
  const randomUint256 = () => BigNumber.from(randomBytes(32)).toBigInt()
  const thousandRandomUint256 = Array.from({ length: 1000 }, randomUint256)
  const leaf = thousandRandomUint256[0]
  return {
    leaf: leaf.toString(),
    ...(await getMerkleTreeInputs(leaf, thousandRandomUint256)),
  }
}

function getCommitements(token: bigint) {
  const randomUint256 = () => BigNumber.from(randomBytes(32)).toBigInt()
  const thousandRandomUint256 = Array.from({ length: 10 }, randomUint256)
  return [...thousandRandomUint256, token]
}

export async function test(token: bigint) {
  const commitements = await getCommitements(token)
  const leaf = token
  return {
    leaf: leaf.toString(),
    ...(await getMerkleTreeInputs(leaf, commitements)),
  }
}
