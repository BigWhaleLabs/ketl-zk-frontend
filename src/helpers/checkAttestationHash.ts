import { KetlAttestation } from '@big-whale-labs/ketl-attestation-token'

export default async function checkAttestationHash(
  ketlAttestationContract: KetlAttestation,
  hash: string,
  attestationType: number
) {
  const currentCountEntanglements =
    await ketlAttestationContract.attestationHashesEntangled(hash)
  const maxEntanglements =
    await ketlAttestationContract.maxEntanglementsPerAttestationType(
      attestationType
    )

  return maxEntanglements.gt(currentCountEntanglements)
}
