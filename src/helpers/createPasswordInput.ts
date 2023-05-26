import CreateProofParams from 'models/CreateProofParams'
import getInput from 'helpers/getInput'
import getEntanglementsHashes from 'helpers/getEntanglementsHashes'
import { BigNumber } from 'ethers'

export default async function createPasswordInput(
  params: CreateProofParams,
  entanglement: string
) {
  const hashes = await getEntanglementsHashes(params.id)
  let message = params.message

  const hexEntanglement = BigNumber.from(entanglement).toHexString()

  console.log(
    'entanglement',
    hashes.includes(hexEntanglement) ? hashes : [hexEntanglement, ...hashes]
  )

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
