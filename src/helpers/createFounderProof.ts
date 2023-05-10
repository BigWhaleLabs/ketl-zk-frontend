import axios from 'axios'
import Signature from 'models/Signature'
import env from './env'
import unpackSignature from './unpackSignature'
import { getYCAllowMapInput } from './getYCMerkleTreeProof'
import PublicKey from 'models/PublicKey'
import { VerificationType, requestSignature } from './requestSignature'

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

export default async function (type: VerificationType, params: object) {
  const hashes = await getHashes(type)
  const eddsaPublicKey = await getEddsaPublicKey()
  const { message, signature } = await requestSignature(
    VerificationType.twitter,
    params
  )
  const merkleTreeInputs = await getYCAllowMapInput(message[1], hashes)
  const { S, R8x, R8y } = await unpackSignature(signature)

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
