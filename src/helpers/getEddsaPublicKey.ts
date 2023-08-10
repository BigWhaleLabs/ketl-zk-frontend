import GeneratorError from 'helpers/GeneratorError'
import env from 'helpers/env'
import isValidEdDSAKey from 'helpers/isValidEdDSAKey'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export default async function getEddsaPublicKey() {
  try {
    const response = await fetch(`${baseURL}/verify/eddsa-public-key`)

    const data = await response.json()

    if (!isValidEdDSAKey(data))
      throw new GeneratorError('Invalid EdDSA public key!')

    return data
  } catch (e) {
    throw new GeneratorError(
      `Can't get attestor config, please try again later`,
      { cause: e }
    )
  }
}
