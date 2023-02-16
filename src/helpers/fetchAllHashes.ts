import { AllowListType } from 'models/AllowListType'
import { utils } from 'ethers'
import getAllowList from 'helpers/getAllowList'

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

export default async function (type: AllowListType) {
  const vcAllowMap = await getAllowList(type)

  const transactions = await vcAllowMap.queryFilter(
    vcAllowMap.filters.TokenHashesAdded()
  )

  return transactions
    .map(({ data, topics }) => parsePostLogData({ data, topics }))
    .map(({ args }) => args.tokenHashes)
    .reduce((chain, tokenHashes) => chain.concat(tokenHashes), [])
    .map((hash: unknown) => String(hash))
}
