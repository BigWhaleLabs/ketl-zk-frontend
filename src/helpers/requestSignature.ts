import CreateProofParams from 'models/CreateProofParams'
import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'
import env from 'helpers/env'
import isValidSignature from 'helpers/isValidSignature'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export default async function requestSignature(
  id: VerificationId,
  type: VerificationType,
  params: CreateProofParams
) {
  const url = `${baseURL}/verify-ketl/${type}`

  const requestParams = {
    ...params,
    type: id,
  }

  const response = await fetch(url, {
    body: JSON.stringify(requestParams),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = await response.json()

  if (!isValidSignature(data)) throw new Error('Invalid signature!')

  return data
}
