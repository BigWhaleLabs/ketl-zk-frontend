import getHashes from 'helpers/getHashes'
import VerificationId from 'models/VerificationId'
import CreateProofParams from 'models/CreateProofParams'
import requestSignature from './requestSignature'

export default async function findVerificationId(params: CreateProofParams) {
  for (let id of [
    VerificationId.KetlTeam,
    VerificationId.VC,
    VerificationId.Founder,
  ]) {
    const { message } = await requestSignature(id, params.type, params)
    const hash = message[1]
    const hashes = await getHashes(id)
    if (hashes.includes(hash)) return id
  }

  throw new Error('Error! Invalid token!')
}
