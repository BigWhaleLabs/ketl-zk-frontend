import getKetlAttestationContract from 'helpers/getKetlAttestationContract'

export default function checkIfProofUsedBefore(nullifier: string) {
  return getKetlAttestationContract().nullifiers(nullifier)
}
