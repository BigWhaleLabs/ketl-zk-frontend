import { BigNumber } from 'ethers'
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'

export async function getMerkleTreeInputs(
  depth: number,
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const proof = await getMerkleTreeProof(
    depth,
    hashFunc,
    commitment,
    commitments
  )

  console.log('proof', proof.root)

  return {
    pathElements: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
    pathIndices: proof.pathIndices,
  }
}

export default function getMerkleTreeProof(
  depth: number,
  hashFunc: (values: string[]) => string | number | bigint | boolean,
  commitment: bigint | string,
  commitments: (bigint | string)[]
) {
  const tree = new IncrementalMerkleTree(
    (values) => BigInt(hashFunc(values)),
    depth,
    BigInt(0),
    2
  )

  commitments.forEach((c) => tree.insert(c))

  return tree.createProof(tree.indexOf(commitment))
}
