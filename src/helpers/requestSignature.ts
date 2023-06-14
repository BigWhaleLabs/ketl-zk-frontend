import CreateProofParams from 'models/CreateProofParams'
import VerificationType from 'models/VerificationType'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export default async function requestSignature(
  type: VerificationType,
  params: CreateProofParams
) {
  const url = `${baseURL}/verify-ketl/${type}`

  const requestParams = {
    ...params,
    type: params.id,
  }

  const response = await fetch(url, {
    body: JSON.stringify(requestParams),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  return response.json()
}
