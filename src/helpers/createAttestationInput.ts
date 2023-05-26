import CreateProofParams from 'models/CreateProofParams'
import getInput from 'helpers/getInput'
import requestSignature from 'helpers/requestSignature'
import unpackSignature from 'helpers/unpackSignature'
import getHashes from 'helpers/getHashes'
import { getEddsaPublicKey } from 'helpers/getEddsaPublicKey'

export default async function createAttestationInput(
  params: CreateProofParams
) {
  const hashes = await getHashes(params.id)
  const eddsaPublicKey = await getEddsaPublicKey()
  let message = params.message,
    signature = params.signature
  if (!message || !signature) {
    const result = await requestSignature(params.id, params.type, params)
    message = result.message
    signature = result.signature
  }
  const hash = message[1]
  const merkleTreeInputs = await getInput(hash, hashes)
  const { R8x, R8y, S } = await unpackSignature(signature)

  const inputs = {
    attestationMessage: message,
    attestationPubKeyX: eddsaPublicKey.x,
    attestationPubKeyY: eddsaPublicKey.y,
    attestationR8x: R8x,
    attestationR8y: R8y,
    attestationS: S,
    password: 69420,
    ...merkleTreeInputs,
  }

  return inputs
}
