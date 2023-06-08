import { BigNumber } from 'ethers'
import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import VerificationId from 'models/VerificationId'
import getEntanglementsHashes from 'helpers/getEntanglementsHashes'
import getInput from 'helpers/getInput'
import checkAttestationHash from './checkAttestationHash'

export default async function createPasswordInput(
  id: VerificationId,
  params: CreateProofParams,
  entanglement: string,
  attestationHash: string,
  signature: Signature
) {
  const hashes = await getEntanglementsHashes(id)
  const message = signature.message

  const isUsedAttestationHash = await checkAttestationHash(attestationHash)

  const hexEntanglement = BigNumber.from(entanglement)
    .toHexString()
    .toLowerCase()

  const hashesLowerCased = hashes.map((hash) => hash.toLowerCase())

  if (isUsedAttestationHash && !hashes.includes(hexEntanglement))
    throw new Error('Error! Incorrect attestationHash and entanglement!')

  const merkleTreeInputs = await getInput(
    hexEntanglement,
    hashesLowerCased.includes(hexEntanglement)
      ? hashes
      : [...hashes, hexEntanglement]
  )

  const inputs = {
    attestationMessage: message,
    password: params.password,
    ...merkleTreeInputs,
  }

  return inputs
}
