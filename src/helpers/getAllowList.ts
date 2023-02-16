import { KetlAllowMap__factory } from '@big-whale-labs/ketl-allow-map-contract'
import AllowListType from 'models/AllowListType'
import defaultProvider from 'helpers/defaultProvider'
import getObssContract from 'helpers/getObssContract'

export default async function (type: AllowListType) {
  const obssContract = getObssContract()

  const vcAllowMapAddress =
    type === AllowListType.vc
      ? await obssContract.vcAllowMap()
      : await obssContract.founderAllowMap()

  return KetlAllowMap__factory.connect(vcAllowMapAddress, defaultProvider)
}
