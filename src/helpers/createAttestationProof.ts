import CreateProofParams from 'models/CreateProofParams'
import checkIfProofUsedBefore from 'helpers/checkIfProofUsedBefore'
import getInput from 'helpers/getInput'
import requestSignature from 'helpers/requestSignature'
import unpackSignature from 'helpers/unpackSignature'
import getHashes from 'helpers/getHashes'
import { getEddsaPublicKey } from 'helpers/getEddsaPublicKey'
import createAttestationInput from './createAttestationInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createProof(params: CreateProofParams) {
  const input = await createAttestationInput(params)

  console.log('createAttestationInput', input)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/AttestationChecker.wasm',
    'zk/AttestationChecker_final.zkey'
  )

  if (await checkIfProofUsedBefore(proof.publicSignals[3])) {
    return Promise.reject(new Error('This token has already been used!'))
  }

  return proof
}
