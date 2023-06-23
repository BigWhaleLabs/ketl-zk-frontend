import Message from 'models/Message'
import Messages from 'models/Messages'
import generateHashByParams from 'helpers/generateHashByParams'
import getHashes from 'helpers/getHashes'
import hashByPoseidon from 'helpers/hashByPoseidon'
import isValidParams from 'helpers/isValidParams'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onValidateParamsMessage(message: Message) {
  try {
    const params = message.params
    if (!isValidParams(params))
      throw new Error('Invalid params for validation!')
    const hashFunc = await hashByPoseidon()
    const attestationHash = generateHashByParams(params, hashFunc)
    const hashes = await getHashes(params.id)
    const hasHash = hashes.includes(attestationHash)

    postWebViewMessage({
      data: {
        isValid: !hasHash,
      },
      id: message.id,
      type: Messages.IsValidResult,
    })
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: `An unknown error has occurred, please try again`,
      type: Messages.IsValidResult,
    })
    console.error(e)
  }
}
