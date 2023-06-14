import CreatePasswordProofParams from 'models/CreatePasswordProofParams'
import createPasswordInput from 'helpers/createPasswordInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function createPasswordProof(
  params: CreatePasswordProofParams
) {
  const input = await createPasswordInput(params)

  const proof = await snarkjs.groth16.fullProve(
    input,
    'zk/PasswordChecker.wasm',
    'zk/PasswordChecker_final.zkey'
  )

  return proof
}
