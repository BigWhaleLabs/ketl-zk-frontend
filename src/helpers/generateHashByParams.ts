import { HashFunction } from '@zk-kit/incremental-merkle-tree'
import FindIdParams from 'models/FindIdParams'
import ValidateProofParams from 'models/ValidateProofParams'
import VerificationType from 'models/VerificationType'
import hexlifyString from 'helpers/hexlifyString'

export default function generateHashByParams(
  params: ValidateProofParams | FindIdParams,
  hashFunc: HashFunction
) {
  switch (params.type) {
    case VerificationType.token:
      if (!params.token || isNaN(parseInt(params.token, 10)))
        throw new Error('Your access code is incorrect')
      return hashFunc([hexlifyString(params.token)])
    case VerificationType.email:
      if (!params.email)
        throw new Error('This email address has not yet been invited')
      return hashFunc([VerificationType.email, hexlifyString(params.email)])
    default:
      throw new Error(`Unknow verification type: ${params.type}!`)
  }
}
