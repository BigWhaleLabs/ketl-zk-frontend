import CreateProofParams from 'models/CreateProofParams'
import VerificationId from 'models/VerificationId'
import getHashes from 'helpers/getHashes'
import requestSignature from 'helpers/requestSignature'

export default async function findVerificationId(params: CreateProofParams) {
  for (const id of [
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
