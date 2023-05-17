import CreateProofParams from 'models/CreateProofParams'
import Signature from 'models/Signature'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export enum VerificationType {
  email = 'email-unique',
  twitter = 'twitter',
  balance = 'balance-unique',
  token = 'token',
}

export enum VerificationId {
  YC = 0,
  Founder = 1,
  VC = 2,
}

export async function requestSignature(
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
