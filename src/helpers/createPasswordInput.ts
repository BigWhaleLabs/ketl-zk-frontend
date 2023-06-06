import { BigNumber } from 'ethers'
import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import getEntanglementsHashes from 'helpers/getEntanglementsHashes'
import getInput from 'helpers/getInput'
import VerificationId from 'models/VerificationId'

export default async function createPasswordInput(
  id: VerificationId,
  params: CreateProofParams,
  entanglement: string,
  signature: Signature
) {
  const hashes = await getEntanglementsHashes(id)
  const message = signature.message

  const hexEntanglement = BigNumber.from(entanglement).toHexString()

  const merkleTreeInputs = await getInput(
    hexEntanglement,
    hashes.includes(hexEntanglement) ? hashes : [hexEntanglement, ...hashes]
  )

  const inputs = {
    attestationMessage: message,
    password: params.password,
    ...merkleTreeInputs,
  }

  return inputs
}
