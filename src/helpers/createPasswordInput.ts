import { BigNumber } from 'ethers'
import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import getEntanglementsHashes from 'helpers/getEntanglementsHashes'
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
  const hashes = await getEntanglementsHashes(id, hash, attestationHash)
  const merkleTreeInputs = await getInput(hash, hashes)

  const inputs = {
    attestationMessage,
    password,
    ...merkleTreeInputs,
  }

  return inputs
}
