import CreateProofParams from 'models/CreateProofParams'
import getInput from 'helpers/getInput'
import getEntanglementsHashes from 'helpers/getEntanglementsHashes'
import { BigNumber } from 'ethers'
import Signature from 'models/Signature'

export default async function createPasswordInput(
  params: CreateProofParams,
  entanglement: string,
  signature: Signature
) {
  const hashes = await getEntanglementsHashes(params.id)
  let message = signature.message

  const hexEntanglement = BigNumber.from(entanglement).toHexString()

  const merkleTreeInputs = await getInput(
    hexEntanglement,
    hashes.includes(hexEntanglement) ? hashes : [hexEntanglement, ...hashes]
  )

  const inputs = {
    attestationMessage: message,
    password: 69420,
    ...merkleTreeInputs,
  }

  return inputs
}
