import AllowListType from 'models/AllowListType'
import getAllowList from 'helpers/getAllowList'

export default async function checkIfProofUsedBefore(
  type: AllowListType,
  nullifier: string
) {
  const allowList = await getAllowList(type)
  return allowList.nullifierMap(nullifier)
}
