import {
  ETH_MUMBAI_NETWORK,
  VERIFY_URL,
  PROD_KETL_OBSS_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_VERIFY_URL: str({ default: VERIFY_URL }),
  VITE_ETH_NETWORK: str({ default: ETH_MUMBAI_NETWORK }),
  VITE_ETH_RPC: str(),
  VITE_KETL_OBSS_CONTRACT_ADDRESS: str({
    default: PROD_KETL_OBSS_CONTRACT_ADDRESS,
  }),
})
