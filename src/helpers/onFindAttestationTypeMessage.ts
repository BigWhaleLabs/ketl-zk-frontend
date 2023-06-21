import Message from 'models/Message'
import Messages from 'models/Messages'
import VerificationId from 'models/VerificationId'
import generateHashByParams from 'helpers/generateHashByParams'
import getHashes from 'helpers/getHashes'
import hashByPoseidon from 'helpers/hashByPoseidon'
import isValidFindIdMessage from 'helpers/isValidFindIdMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onFindAttestationTypeMessage(message: Message) {
  try {
    const params = message.params
    if (!isValidFindIdMessage(params))
      throw new Error('Invalid params for attestation!')
    const hashFunc = await hashByPoseidon()
    const attestationHash = generateHashByParams(params, hashFunc)

    const ids = [VerificationId.Founder, VerificationId.VC]
    for (const id of ids) {
      const hashes = await getHashes(params.id)
      if (hashes.includes(attestationHash)) {
        return postWebViewMessage({
          data: {
            id,
          },
          type: Messages.GetAttestationProof,
        })
      }
    }

    throw new Error(`Can't find id`)
  } catch (e) {
    postWebViewMessage({
      data: {
        e: JSON.stringify(e, Object.getOwnPropertyNames(e)),
        message: `Can't find id`,
      },
      type: Messages.GetProofError,
    })
    console.error(e)
  }
}
