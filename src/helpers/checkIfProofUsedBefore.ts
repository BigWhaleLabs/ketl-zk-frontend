import getKetlAttestationContract from './getKetlAttestationContract'

export default async function checkIfProofUsedBefore(nullifier: string) {
  return getKetlAttestationContract().nullifiers(nullifier)
}
