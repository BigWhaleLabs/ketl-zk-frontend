import {
  DEV_KETL_ATTESTATION_CONTRACT,
  ETH_MUMBAI_NETWORK,
  KETL_INVITES_BACKEND,
  PROD_KETL_ATTESTATION_CONTRACT,
  VERIFY_URL,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_DEV_KETL_ATTESTATION_CONTRACT_ADDRESS: str({
    default: DEV_KETL_ATTESTATION_CONTRACT,
  }),
  VITE_ETH_NETWORK: str({ default: ETH_MUMBAI_NETWORK }),
  VITE_ETH_RPC: str(),
  VITE_KETL_ATTESTATION_CONTRACT_ADDRESS: str({
    default: PROD_KETL_ATTESTATION_CONTRACT,
  }),
  VITE_KETL_INVITES_BACKEND: str({
    default: KETL_INVITES_BACKEND,
  }),
  VITE_SENTRY_DSN: str(),
  VITE_VERIFY_URL: str({ default: VERIFY_URL }),
})
