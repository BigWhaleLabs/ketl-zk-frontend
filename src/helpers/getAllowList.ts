import { AllowListType } from 'models/AllowListType'
import { KetlAllowMap__factory } from '@big-whale-labs/ketl-allow-map-contract'
import defaultProvider from 'helpers/defaultProvider'
import getObssContract from 'helpers/getObssContract'

export default async function (type: AllowListType) {
  const obssContract = getObssContract()

  const vcAllowMapAddress =
    type === 'vc'
      ? await obssContract.vcAllowMap()
      : await obssContract.founderAllowMap()

  return KetlAllowMap__factory.connect(vcAllowMapAddress, defaultProvider)
}
