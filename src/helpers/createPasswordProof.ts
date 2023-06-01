import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import createPasswordInput from 'helpers/createPasswordInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createPasswordProof(
  params: CreateProofParams,
  entanglement: string,
  signature: Signature
) {
  const input = await createPasswordInput(params, entanglement, signature)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/PasswordChecker.wasm',
    'zk/PasswordChecker_final.zkey'
  )

  return proof
}
