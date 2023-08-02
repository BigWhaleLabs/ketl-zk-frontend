import Message from 'models/Message'
import Messages from 'models/Messages'
import VerificationId from 'models/VerificationId'
import generateHashByParams from 'helpers/generateHashByParams'
import getHashesMap from 'helpers/getHashesMap'
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

    const ids = [
      VerificationId.TopYC,
      VerificationId.TopVC,
      VerificationId.Founder,
      VerificationId.VC,
      VerificationId.YC,
    ]
    for (const id of ids) {
      const hashes = await getHashesMap(id)
      if (hashes[attestationHash]) {
        return postWebViewMessage({
          data: {
            id,
          },
          id: message.id,
          type: Messages.FindResult,
        })
      }
    }

    const errorMessage =
      params.type === '0'
        ? `Couldn't find invitation for this email address, try another one`
        : `Couldn't find invitation, try another one`

    const e = new Error(errorMessage)
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: errorMessage,
      type: Messages.FindResult,
    })
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: `An unknown error has occurred, please try again`,
      type: Messages.FindResult,
    })
    console.error(e)
  }
}
