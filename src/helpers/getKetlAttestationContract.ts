import { KetlAttestation__factory } from '@big-whale-labs/ketl-attestation-token'
import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'
import env from 'helpers/env'

export const transferEventInterface = new utils.Interface(
  KetlAttestation__factory.abi
)

export default function getKetlAttestationContract() {
  return KetlAttestation__factory.connect(
    env.VITE_KETL_ATTESTATION_CONTRACT_ADDRESS,
    defaultProvider
  )
}
