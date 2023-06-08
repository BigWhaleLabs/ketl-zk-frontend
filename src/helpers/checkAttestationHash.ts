import getKetlAttestationContract from './getKetlAttestationContract'

export default async function checkAttestationHash(hash: string) {
  return getKetlAttestationContract().attestationHashesEntangled(hash)
}
