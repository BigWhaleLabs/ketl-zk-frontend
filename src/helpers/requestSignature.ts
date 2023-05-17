import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import VerificationId from 'models/VerificationId'
import VerificationType from 'models/VerificationType'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export default async function requestSignature(
  id: VerificationId,
  type: VerificationType,
  params: CreateProofParams
) {
  if (id !== VerificationId.YC) {
    const { data } = await axios.post<Signature>(
      `${baseURL}/verify-token/token`,
      {
        ...params,
        type: id,
      }
    )
    return data
  }

  const { data } = await axios.post<Signature>(
    `${baseURL}/verify-/${type}`,
    params
  )

  return data
}
