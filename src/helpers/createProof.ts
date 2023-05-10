import { getAllowMapInput } from 'helpers/getAllowMapInput'
import AllowListType from 'models/AllowListType'
import ProofResult from 'models/ProofResult'
import checkIfProofUsedBefore from 'helpers/checkIfProofUsedBefore'
import fetchAllHashes from 'helpers/fetchAllHashes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function (
  token: string
): Promise<{ proof: ProofResult; type: AllowListType }> {
  for (const type of [
    AllowListType.VC,
    AllowListType.Founder,
  ] as AllowListType[]) {
    try {
      const hashes = await fetchAllHashes(type)
      const proof = await snarkjs.groth16.fullProve(
        await getAllowMapInput(token, hashes),
        'zk/AllowMapChecker.wasm',
        'zk/AllowMapChecker_final.zkey'
      )

      if (await checkIfProofUsedBefore(type, proof.publicSignals[1])) {
        return Promise.reject(new Error(`This token has already been used!`))
      }
      return { proof, type }
    } catch (e) {
      console.error(e)
    }
  }

  return Promise.reject(new Error(`Can't generate valid proof with this token`))
}
