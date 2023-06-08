import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import VerificationId from 'models/VerificationId'
import createPasswordInput from 'helpers/createPasswordInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createPasswordProof(
  id: VerificationId,
  params: CreateProofParams,
  entanglement: string,
  attestationHash: string,
  signature: Signature
) {
  const input = await createPasswordInput(
    id,
    params,
    entanglement,
    attestationHash,
    signature
  )

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/PasswordChecker.wasm',
    'zk/PasswordChecker_final.zkey'
  )

  return proof
}
