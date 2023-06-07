import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import VerificationId from 'models/VerificationId'
import createAttestationInput from 'helpers/createAttestationInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createAttestationProof(
  id: VerificationId,
  params: CreateProofParams,
  signature: Signature
) {
  const input = await createAttestationInput(id, params, signature)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/AttestationChecker.wasm',
    'zk/AttestationChecker_final.zkey'
  )

  return proof
}
