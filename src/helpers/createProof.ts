import { requestSignature } from 'helpers/requestSignature'
import CreateProofParams from 'models/CreateProofParams'
import PublicKey from 'models/PublicKey'
import axios from 'axios'
import env from 'helpers/env'
import getInput from 'helpers/getInput'
import unpackSignature from 'helpers/unpackSignature'
import checkIfProofUsedBefore from './checkIfProofUsedBefore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export async function getEddsaPublicKey() {
  const { data } = await axios.get<PublicKey>(
    `${baseURL}/verify/eddsa-public-key`
  )
  return data
}

async function getHashes(id: number) {
  const response = await fetch(`/trees/${id}.json`)

  return response.json()
}

export default async function createFounderProof(params: CreateProofParams) {
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
    nullifier: 69420,
    ...merkleTreeInputs,
  }

  const proof = await snarkjs.groth16.fullProve(
    inputs,
    'zk/AttestationChecker.wasm',
    'zk/AttestationChecker_final.zkey'
  )

  if (await checkIfProofUsedBefore(proof.publicSignals[3])) {
    return Promise.reject(new Error(`This token has already been used!`))
  }

  return proof
}
