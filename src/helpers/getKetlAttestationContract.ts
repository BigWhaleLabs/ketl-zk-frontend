import { KetlAttestation__factory } from '@big-whale-labs/ketl-attestation-token'
import defaultProvider from 'helpers/defaultProvider'
import env from 'helpers/env'

export default function getKetlAttestationContract() {
  return KetlAttestation__factory.connect(
    env.VITE_KETL_ATTESTATION_CONTRACT_ADDRESS,
    defaultProvider
  )
}
