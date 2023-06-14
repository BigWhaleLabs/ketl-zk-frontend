import ketlAttestationContract from 'helpers/ketlAttestationContract'

export default function checkAttestationHash(hash: string) {
  return ketlAttestationContract.attestationHashesEntangled(hash)
}
