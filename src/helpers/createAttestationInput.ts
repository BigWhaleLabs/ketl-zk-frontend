import CreateProofParams from 'models/CreateProofParams'
import getInput from 'helpers/getInput'
import unpackSignature from 'helpers/unpackSignature'
import getHashes from 'helpers/getHashes'
import { getEddsaPublicKey } from 'helpers/getEddsaPublicKey'
import Signature from 'models/Signature'

export default async function createAttestationInput(
  params: CreateProofParams,
  { message, signature }: Signature
) {
  const hashes = await getHashes(params.id)
  const eddsaPublicKey = await getEddsaPublicKey()
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
