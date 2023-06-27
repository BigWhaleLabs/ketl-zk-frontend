import { KetlAttestation } from '@big-whale-labs/ketl-attestation-token'

export default function checkAttestationHash(
  contract: KetlAttestation,
  hash: string
) {
  return contract.attestationHashesEntangled(hash)
}
