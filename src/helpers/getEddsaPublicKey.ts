import env from 'helpers/env'
import isValidEdDSAKey from './isValidEdDSAKey'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export async function getEddsaPublicKey() {
  const response = await fetch(`${baseURL}/verify/eddsa-public-key`)

  const data = await response.json()

  if (!isValidEdDSAKey(data)) throw new Error('Invalid EdDSA public key!')

  return data
}
