import { KetlAllowMap__factory } from '@big-whale-labs/ketl-allow-map-contract'
import AllowListType from 'models/AllowListType'
import defaultProvider from 'helpers/defaultProvider'
import getObssContract from 'helpers/getObssContract'

export default async function getAllowList(type: AllowListType) {
  const obssContract = getObssContract()

  const allowMapAddress =
    type === AllowListType.VC
      ? await obssContract.vcAllowMap()
      : await obssContract.founderAllowMap()

  return KetlAllowMap__factory.connect(allowMapAddress, defaultProvider)
}
