import { utils } from 'ethers'
import AllowListType from 'models/AllowListType'
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
  const allowMap = await getAllowList(type)

  const transactions = await allowMap.queryFilter(
    allowMap.filters.TokenHashesAdded()
  )

  return transactions
    .map(({ data, topics }) => parsePostLogData({ data, topics }))
    .map(({ args }) => args.tokenHashes)
    .reduce((chain, tokenHashes) => chain.concat(tokenHashes), [])
    .map((hash: unknown) => String(hash))
}
