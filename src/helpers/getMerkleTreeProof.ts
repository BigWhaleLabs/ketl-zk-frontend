import { BigNumber } from 'ethers'
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { buildPoseidon } from 'circomlibjs'
import fetchAllHashes from 'helpers/fetchAllHashes'

export async function getMerkleTreeInputs(
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const proof = await getMerkleTreeProof(hashFunc, commitment, commitments)

  return {
    pathIndices: proof.pathIndices,
    pathElements: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
  }
}

export default function getMerkleTreeProof(
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const tree = new IncrementalMerkleTree(
    (values) => BigInt(hashFunc(values)),
    15,
    BigInt(0),
    2
  )

  commitments.forEach((c) => tree.insert(c))

  return tree.createProof(tree.indexOf(commitment))
}

export async function getAllowMapInput(token: string) {
  const poseidon = await buildPoseidon()
  function hashFunc(values: string[]) {
    const F = poseidon.F
    return F.toString(poseidon(values))
  }
  const hashedToken = hashFunc([token])
  const hashes = await fetchAllHashes()

  return {
    leaf: hashedToken.toString(),
    ...(await getMerkleTreeInputs(hashFunc, hashedToken, hashes)),
  }
}
