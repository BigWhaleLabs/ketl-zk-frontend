import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import createAttestationInput from 'helpers/createAttestationInput'
import generateAttestationProof from 'helpers/generateAttestationProof'

export default async function createAttestationProof(
  params: CreateProofParams,
  signature: Signature
) {
  const input = await createAttestationInput(params, signature)
  const proof = await generateAttestationProof(input)

  return proof
}
