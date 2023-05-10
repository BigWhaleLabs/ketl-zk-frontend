import axios from 'axios'
import Signature from 'models/Signature'
import env from './env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1`

export enum VerificationType {
  email = 'email-unique',
  twitter = 'twitter',
  balance = 'balance-unique',
}

export async function requestSignature(type: VerificationType, params: object) {
  const { data } = await axios.post<Signature>(
    `${baseURL}/verify-yc/${type}`,
    params
  )
  return data
}
