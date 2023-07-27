import { BigNumber } from 'ethers'
import {
  getKetlAttestationContract,
  transferEventInterface,
} from 'helpers/getKetlAttestationContract'
import checkAttestationHash from 'helpers/checkAttestationHash'

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
  attestation: string,
  isDev?: boolean
) {
  const ketlAttestationContract = getKetlAttestationContract(isDev)
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

  const isUsedAttestation = await checkAttestationHash(
    ketlAttestationContract,
    attestation,
    type
  )

  if (isUsedAttestation && hashIndex === -1)
    throw new Error(
      `This verification method has already been used for another account!`
    )

  if (hashIndex === -1) {
    throw new Error(`This hash isn't among those added to the blockchain`)
  }

  if (batchSize > filteredEntanglements.length)
    throw new Error(`Batch hasn't been completed`)

  return filteredEntanglements
}
