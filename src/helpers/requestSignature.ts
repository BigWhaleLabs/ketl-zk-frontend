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
  const url =
    id !== VerificationId.YC
      ? `${baseURL}/verify-token/token`
      : `${baseURL}/verify-/${type}`

  const requestParams =
    id !== VerificationId.YC
      ? {
          ...params,
          type: id,
        }
      : params

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestParams),
  })
  const data = await response.json()

  if (!isValidSignature(data)) throw new Error('Invalid signature!')

  return data
}
