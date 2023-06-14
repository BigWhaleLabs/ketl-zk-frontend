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
      type: Messages.GetPasswordProof,
    })
  } catch (e) {
    postWebViewMessage({
      data: {
        e: JSON.stringify(e, Object.getOwnPropertyNames(e)),
        message: `Can't generate valid proof with this token`,
      },
      type: Messages.GetProofError,
    })
    console.error(e)
  }
}
