import { BigNumber } from 'ethers'
import { MerkleProof } from '@zk-kit/incremental-merkle-tree'
import AttestationType from 'models/AttestationType'
import GeneratorError from 'helpers/GeneratorError'
import env from 'helpers/env'

export default async function getMerkleInputs(
  attestationType: AttestationType,
  hash: string
) {
  try {
    const response = await fetch(
      `${env.VITE_KETL_INVITES_BACKEND}/merkle/proof?attestationType=${attestationType}&hash=${hash}`
    )

    const data = (await response.json()) as MerkleProof

    return {
      pathElements: data.siblings.map((s) => BigNumber.from(s).toHexString()),
      pathIndices: data.pathIndices,
    }
  } catch (e) {
    throw new GeneratorError(`Can't get merkle proof, please try again later`, {
      cause: e,
    })
  }
}
