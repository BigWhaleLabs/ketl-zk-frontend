import { OBSSStorage__factory } from '@big-whale-labs/obss-storage-contract'
import defaultProvider from 'helpers/defaultProvider'
import env from 'helpers/env'

export default function () {
  return OBSSStorage__factory.connect(
    env.VITE_KETL_OBSS_CONTRACT_ADDRESS,
    defaultProvider
  )
}
