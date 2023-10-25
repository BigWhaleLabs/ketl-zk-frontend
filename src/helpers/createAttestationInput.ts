import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import getEddsaPublicKey from 'helpers/getEddsaPublicKey'
import getProof from 'helpers/getProof'
import unpackSignature from 'helpers/unpackSignature'

async function generateMerkleTreeInputs(
  params: CreateProofParams,
  hash: string
) {
  const { pathIndices, siblings } = await getProof(params.id, hash)

  return {
    pathElements: siblings,
    pathIndices,
  }
}

export default async function createAttestationInput(
  params: CreateProofParams,
  { message, publicKey, signature }: Signature
) {
  const eddsaPublicKey = publicKey ?? (await getEddsaPublicKey())
  const merkleTreeInputs =
    params.merkleTreeInputs ??
    (await generateMerkleTreeInputs(params, message[1]))
  const { R8x, R8y, S } = await unpackSignature(signature)

  const inputs = {
    attestationMessage: message,
    attestationPubKeyX: eddsaPublicKey.x,
    attestationPubKeyY: eddsaPublicKey.y,
    attestationR8x: R8x,
    attestationR8y: R8y,
    attestationS: S,
    password: params.password,
    ...merkleTreeInputs,
  }

  return inputs
}
