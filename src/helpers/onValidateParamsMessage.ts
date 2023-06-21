import Message from 'models/Message'
import Messages from 'models/Messages'
import generateHashByParams from 'helpers/generateHashByParams'
import getHashes from 'helpers/getHashes'
import hashByPoseidon from 'helpers/hashByPoseidon'
import isValidAttestationProofMessage from 'helpers/isValidAttestationProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onValidateParamsMessage(message: Message) {
  try {
    const params = message.params
    if (!isValidAttestationProofMessage(params))
      throw new Error('Invalid params for attestation!')
    const hashFunc = await hashByPoseidon()
    const attestationHash = generateHashByParams(params, hashFunc)
    const hashes = await getHashes(params.id)
    const hasHash = hashes.includes(attestationHash)

    postWebViewMessage({
      data: {
        isValid: !hasHash,
      },
      type: Messages.GetAttestationProof,
    })
  } catch (e) {
    postWebViewMessage({
      data: {
        e: JSON.stringify(e, Object.getOwnPropertyNames(e)),
        message: `Can't validate params`,
      },
      type: Messages.GetProofError,
    })
    console.error(e)
  }
}
