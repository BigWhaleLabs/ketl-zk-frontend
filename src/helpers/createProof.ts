import * as snarkjs from 'snarkjs'
import { getAllowMapInput } from 'helpers/getMerkleTreeProof'
import ProofResult from 'models/ProofResult'

export default async function (token: string): Promise<ProofResult> {
  return snarkjs.groth16.fullProve(
    await getAllowMapInput(token),
    'zk/AllowMapChecker.wasm',
    'zk/AllowMapChecker_final.zkey'
  )
}
