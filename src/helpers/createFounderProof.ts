import axios from 'axios'
import Signature from 'models/Signature'
import env from './env'
import unpackSignature from './unpackSignature'
import { getYCAllowMapInput } from './getYCMerkleTreeProof'
import PublicKey from 'models/PublicKey'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export async function requestTwitterSignature(token: string) {
  const { data } = await axios.post<Signature>(`${baseURL}/verify-yc/twitter`, {
    token,
  })
  return data
}

export async function getEddsaPublicKey() {
  const { data } = await axios.get<PublicKey>(
    `${baseURL}/verify/eddsa-public-key`
  )
  return data
}

export default async function (token: string) {
  try {
    const response = await fetch('/trees/yc/1.json')
    const hashes = await response.json()
    const eddsaPublicKey = await getEddsaPublicKey()
    const { message, signature } = await requestTwitterSignature(token)
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
  } catch (e) {
    console.error(e)
  }
}
