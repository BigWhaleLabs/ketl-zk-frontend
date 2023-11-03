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
  const eddsaPublicKey = publicKey ?? {
    x:
      '3022588728262621016474471722865235652573366639695808085248430151628770415819',
    y:
      '14057266046546817928140094441885285376703482229051018203400595159797179656041',
  }
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
