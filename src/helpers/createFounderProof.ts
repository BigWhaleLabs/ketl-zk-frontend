import { VerificationType, requestSignature } from 'helpers/requestSignature'
import PublicKey from 'models/PublicKey'
import axios from 'axios'
import env from 'helpers/env'
import getYCInput from 'helpers/getYCInput'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export async function getEddsaPublicKey() {
  const { data } = await axios.get<PublicKey>(
    `${baseURL}/verify/eddsa-public-key`
  )
  return data
}

async function getHashes(type: VerificationType) {
  const response = await fetch(`/trees/yc/${type}.json`)
  return response.json()
}

export default async function createFounderProof({
  type,
  params,
}: {
  type: VerificationType
  params: object & { message?: string[]; signature?: string }
}) {
  const hashes = await getHashes(type)
  const eddsaPublicKey = await getEddsaPublicKey()
  let message = params.message,
    signature = params.signature
  if (!message || !signature) {
    const result = await requestSignature(type, params)
    message = result.message
    signature = result.signature
  }
  const merkleTreeInputs = await getYCInput(message[1], hashes)
  const { R8x, R8y, S } = await unpackSignature(signature)

  const inputs = {
    attestationMessage: message,
    attestationPubKeyX: eddsaPublicKey.x,
    attestationPubKeyY: eddsaPublicKey.y,
    attestationR8x: R8x,
    attestationR8y: R8y,
    attestationS: S,
    nullifier: 69420,
    ...merkleTreeInputs,
  }

  const proof = await snarkjs.groth16.fullProve(
    inputs,
    'zk/AttestationChecker.wasm',
    'zk/AttestationChecker_final.zkey'
  )

  return proof
}
