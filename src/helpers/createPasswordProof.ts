import CreateProofParams from 'models/CreateProofParams'
import createPasswordInput from './createPasswordInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createPasswordProof(
  params: CreateProofParams,
  entanglement: string
) {
  const input = await createPasswordInput(params, entanglement)

  console.log('input', input)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/PasswordChecker.wasm',
    'zk/PasswordChecker_final.zkey'
  )

  return proof
}
