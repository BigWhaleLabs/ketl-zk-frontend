import getKetlAttestationContract from 'helpers/getKetlAttestationContract'

export default function checkAttestationHash(hash: string) {
  return getKetlAttestationContract().attestationHashesEntangled(hash)
}
