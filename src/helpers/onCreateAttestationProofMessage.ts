import GeneratorError from 'helpers/GeneratorError'
import Message from 'models/Message'
import Messages from 'models/Messages'
import createAttestationProof from 'helpers/createAttestationProof'
import isValidAttestationProofMessage from 'helpers/isValidAttestationProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onCreateAttestationProofMessage(
  message: Message
) {
  try {
    if (!isValidAttestationProofMessage(message.params) || !message.signature)
      throw new GeneratorError('Invalid parameters for verification')
    const attestationProof = await createAttestationProof(
      message.params,
      message.signature
    )
    postWebViewMessage({
      data: {
        attestationMessage: message.signature.message,
        attestationProof,
      },
      id: message.id,
      type: Messages.GetAttestationProof,
    })
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: GeneratorError.isGeneratorError(e)
        ? e.message
        : `An error occurred while verification, please try again`,
      type: Messages.GetAttestationProof,
    })
    console.error(e)
  }
}
