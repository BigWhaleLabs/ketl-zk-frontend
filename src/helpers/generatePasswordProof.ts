import GeneratorError from 'helpers/GeneratorError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default function generatePasswordProof(input: unknown) {
  try {
    return snarkjs.groth16.fullProve(
      input,
      'zk/PasswordChecker.wasm',
      'zk/PasswordChecker_final.zkey'
    )
  } catch (e) {
    throw new GeneratorError(
      'Failed to prepare verification data for registration',
      {
        cause: e,
      }
    )
  }
}
