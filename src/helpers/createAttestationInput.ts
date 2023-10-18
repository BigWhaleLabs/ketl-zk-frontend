import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import getEddsaPublicKey from 'helpers/getEddsaPublicKey'
import getMerkleInputs from 'helpers/getMerkleInputs'
import unpackSignature from 'helpers/unpackSignature'

export default async function createAttestationInput(
  params: CreateProofParams,
  { message, signature }: Signature
) {
  const hash = message[1]
  const merkleTreeInputs = await getMerkleInputs(params.id, hash)
  const eddsaPublicKey = await getEddsaPublicKey()
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
