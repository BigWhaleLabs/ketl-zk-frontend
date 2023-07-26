import ketlAttestationContract from 'helpers/ketlAttestationContract'

export default async function checkAttestationHash(
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
