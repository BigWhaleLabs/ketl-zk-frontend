import { AllowListType } from 'models/AllowListType'
import { getAllowMapInput } from 'helpers/getMerkleTreeProof'
import ProofResult from 'models/ProofResult'
import fetchAllHashes from 'helpers/fetchAllHashes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

export default async function (
  token: string
): Promise<{ proof: ProofResult; type: AllowListType }> {
  for (const type of ['vc', 'founder'] as AllowListType[]) {
    try {
      const hashes = await fetchAllHashes(type)
      const proof = snarkjs.groth16.fullProve(
        await getAllowMapInput(token, hashes),
        'zk/AllowMapChecker.wasm',
        'zk/AllowMapChecker_final.zkey'
      )
      return { proof, type }
    } catch (e) {}
  }

  return Promise.reject(new Error(`Can't generate valid proof with this token`))
}
