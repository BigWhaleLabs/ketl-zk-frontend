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
      throw new Error('Invalid data for attestation proof!')
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
      message: `Can't generate valid proof with this token`,
      type: Messages.GetAttestationProof,
    })
    console.error(e)
  }
}
