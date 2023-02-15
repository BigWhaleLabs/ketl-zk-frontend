import { KetlAllowMap__factory } from '@big-whale-labs/ketl-allow-map-contract'
import { utils } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'
import getObssContract from 'helpers/getObssContract'

const transferEventInterface = new utils.Interface([
  `event TokenHashesAdded(uint256[] tokenHashes, bytes32 newMerkleRoot)`,
])

function parsePostLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export default async function () {
  const obssContract = getObssContract()

  const vcAllowMapAddress = await obssContract.vcAllowMap()
  const vcAllowMap = KetlAllowMap__factory.connect(
    vcAllowMapAddress,
    defaultProvider
  )

  const transactions = await vcAllowMap.queryFilter(
    vcAllowMap.filters.TokenHashesAdded()
  )

  return transactions
    .map(({ data, topics }) => parsePostLogData({ data, topics }))
    .map(({ args }) => args.tokenHashes)
    .reduce((chain, tokenHashes) => chain.concat(tokenHashes), [])
    .map((hash: unknown) => String(hash))
}
