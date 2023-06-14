import { BigNumber } from 'ethers'
import { transferEventInterface } from 'helpers/getKetlAttestationContract'
import checkAttestationHash from 'helpers/checkAttestationHash'
import ketlAttestationContract from 'helpers/ketlAttestationContract'

function parseEntanglementRegistered({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export default async function getBatchOfEntanglementsHashes(
  type: number,
  hash: string,
  attestation: string
) {
  const batchSize = await ketlAttestationContract.minimumEntanglementCounts(
    type
  )
  const entanglements = await ketlAttestationContract.queryFilter(
    ketlAttestationContract.filters.EntanglementRegistered()
  )
  const filteredEntanglements = entanglements
    .map(parseEntanglementRegistered)
    .filter(({ args }) => Number(args[0]) === type)
    .map(({ args }) => BigNumber.from(args[1]).toHexString().toLowerCase())

  const hashIndex = filteredEntanglements.indexOf(hash)

  const isUsedAttestation = await checkAttestationHash(attestation)

  if (isUsedAttestation && hashIndex === -1)
    throw new Error(
      `This verification method has already been used for another account!`
    )

  if (hashIndex === -1) {
    throw new Error(`This hash isn't among those added to the blockchain`)
  }

  const batchHashIndex = hashIndex - (hashIndex % batchSize) + batchSize

  if (batchHashIndex > filteredEntanglements.length) {
    throw new Error(`Batch hasn't been completed for this account yet`)
  }

  return filteredEntanglements.slice(0, batchHashIndex)
}
