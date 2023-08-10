import GeneratorError from 'helpers/GeneratorError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default function generateAttestationProof(input: unknown) {
  try {
    return snarkjs.groth16.fullProve(
      input,
      'zk/AttestationChecker.wasm',
      'zk/AttestationChecker_final.zkey'
    )
  } catch (e) {
    throw new GeneratorError('The verifier failed to validate the invite', {
      cause: e,
    })
  }
}
