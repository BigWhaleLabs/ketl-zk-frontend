import { BigNumber } from 'ethers'
import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import getBatchOfEntanglementsHashes from 'helpers/getBatchOfEntanglementsHashes'
import getInput from 'helpers/getInput'

export default async function createPasswordInput(
  params: CreatePasswordProofParams
) {
  const {
    attestationHash,
    entanglement,
    id,
    message: attestationMessage,
    password,
  } = params

  const hash = BigNumber.from(entanglement).toHexString().toLowerCase()
  const hashes = await getBatchOfEntanglementsHashes(
    id,
    hash,
    attestationHash,
    params.isDev
  )
  const merkleTreeInputs = await getInput(hash, hashes)

  const inputs = {
    attestationMessage,
    password,
    ...merkleTreeInputs,
  }

  return inputs
}
