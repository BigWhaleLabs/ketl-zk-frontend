import {
  ETH_MUMBAI_NETWORK,
  VERIFY_URL,
  KETL_ATTESTATION_CONTRACT,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ETH_NETWORK: str({ default: ETH_MUMBAI_NETWORK }),
  VITE_ETH_RPC: str(),
  VITE_KETL_ATTESTATION_CONTRACT_ADDRESS: str({
    default: KETL_ATTESTATION_CONTRACT,
  }),
  VITE_VERIFY_URL: str({ default: VERIFY_URL }),
})
