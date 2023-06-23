import Message from 'models/Message'
import Messages from 'models/Messages'
import createPasswordProof from 'helpers/createPasswordProof'
import isValidPasswordProofMessage from 'helpers/isValidPasswordProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onPasswordProofMessage(message: Message) {
  try {
    if (!isValidPasswordProofMessage(message.params))
      throw new Error('Invalid data for password proof!')
    const data = await createPasswordProof(message.params)

    postWebViewMessage({
      data,
      id: message.id,
      type: Messages.GetPasswordProof,
    })
  } catch (e) {
    postWebViewMessage({
      error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
      id: message.id,
      message: `Can't generate valid password proof`,
      type: Messages.GetPasswordProof,
    })
    console.error(e)
  }
}
