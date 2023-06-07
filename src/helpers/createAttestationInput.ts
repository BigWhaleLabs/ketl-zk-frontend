import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import VerificationId from 'models/VerificationId'
import getEddsaPublicKey from 'helpers/getEddsaPublicKey'
import getHashes from 'helpers/getHashes'
import getInput from 'helpers/getInput'
import unpackSignature from 'helpers/unpackSignature'

export default async function createAttestationInput(
  id: VerificationId,
  params: CreateProofParams,
  { message, signature }: Signature
) {
  const hashes = await getHashes(id)
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
    password: params.password,
    ...merkleTreeInputs,
  }

  return inputs
}
