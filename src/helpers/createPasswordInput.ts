import { BigNumber } from 'ethers'
import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import getBatchOfEntanglementsHashes from 'helpers/getBatchOfEntanglementsHashes'
import getInput from 'helpers/getInput'

async function generateMerkleTreeInputs(params: CreatePasswordProofParams) {
  const { attestationHash, entanglement, id } = params
  const hash = BigNumber.from(entanglement).toHexString().toLowerCase()
  const hashes = await getBatchOfEntanglementsHashes(
    id,
    hash,
    attestationHash,
    params.isDev
  )

  return getInput(hash, hashes)
}

export default async function createPasswordInput(
  params: CreatePasswordProofParams
) {
  const { message: attestationMessage, password } = params

  const merkleTreeInputs =
    params.merkleTreeInputs ?? (await generateMerkleTreeInputs(params))

  const inputs = {
    attestationMessage,
    password,
    ...merkleTreeInputs,
  }

  return inputs
}
