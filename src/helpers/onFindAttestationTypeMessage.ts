import GeneratorError from 'helpers/GeneratorError'
import Message from 'models/Message'
import Messages from 'models/Messages'
import VerificationList from 'models/VerificationList'
import generateHashByParams from 'helpers/generateHashByParams'
import getHashes from 'helpers/getHashes'
import hashByPoseidon from 'helpers/hashByPoseidon'
import isValidFindIdMessage from 'helpers/isValidFindIdMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onFindAttestationTypeMessage(message: Message) {
  try {
    const params = message.params
    if (!isValidFindIdMessage(params))
      throw new GeneratorError('Invalid params for attestation')
    const hashFunc = await hashByPoseidon()
    const attestationHash = generateHashByParams(params, hashFunc)

    const ids = params?.accountTypes || VerificationList
    for (const id of ids) {
      const hashes = await getHashes(id)
      const hashSet = new Set(hashes)
      if (hashSet.has(attestationHash)) {
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

    throw new GeneratorError(errorMessage)
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: GeneratorError.isGeneratorError(e)
        ? e.message
        : `An error has occurred while checking the invite, please try again`,
      type: Messages.FindResult,
    })
    console.error(e)
  }
}
