import CreateProofParams from 'models/CreateProofParams'
import createAttestationInput from './createAttestationInput'
import Signature from 'models/Signature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createAttestationProof(
  params: CreateProofParams,
  signature: Signature
) {
  const input = await createAttestationInput(params, signature)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/AttestationChecker.wasm',
    'zk/AttestationChecker_final.zkey'
  )

  return proof
}
