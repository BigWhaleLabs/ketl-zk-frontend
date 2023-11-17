import GeneratorError from 'helpers/GeneratorError'
import Message from 'models/Message'
import Messages from 'models/Messages'
import createPasswordProof from 'helpers/createPasswordProof'
import handleError from 'helpers/handleError'
import isValidPasswordProofMessage from 'helpers/isValidPasswordProofMessage'
import onProofProgress from 'helpers/onProofProgress'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onPasswordProofMessage(message: Message) {
  try {
    if (!isValidPasswordProofMessage(message.params))
      throw new GeneratorError('Invalid data for password proof!')

    const data = await createPasswordProof(
      message.params,
      onProofProgress(message.id)
    )

    postWebViewMessage({
      data,
      id: message.id,
      type: Messages.GetPasswordProof,
    })
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: GeneratorError.isGeneratorError(e)
        ? e.message
        : `An error occurred while preparing data for registration, please try again`,
      type: Messages.GetPasswordProof,
    })
    handleError({ e })
    console.error(e)
  }
}
