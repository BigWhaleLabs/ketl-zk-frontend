import { BigNumber } from 'ethers'
import getKetlAttestationContract, {
  transferEventInterface,
} from 'helpers/getKetlAttestationContract'

function parseEntanglementRegistered({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export default async function getEntanglementsHashes(type: number) {
  const contract = getKetlAttestationContract()

  const entanglements = await contract.queryFilter(
    contract.filters.EntanglementRegistered()
  )

  return entanglements
    .map(parseEntanglementRegistered)
    .filter(({ args }) => Number(args[0]) === type)
    .map(({ args }) => BigNumber.from(args[1]).toHexString())
}
