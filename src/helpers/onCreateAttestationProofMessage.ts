import GeneratorError from 'helpers/GeneratorError'
import Message from 'models/Message'
import Messages from 'models/Messages'
import ProofResultStatus from 'models/ProofResultStatus'
import createAttestationInput from 'helpers/createAttestationInput'
import generateAttestationProof from 'helpers/generateAttestationProof'
import isValidAttestationProofMessage from 'helpers/isValidAttestationProofMessage'
import onProofProgress from 'helpers/onProofProgress'
import postWebViewMessage from 'helpers/postWebViewMessage'

export default async function onCreateAttestationProofMessage(
  message: Message
) {
  try {
    postWebViewMessage({
      data: {
        status: ProofResultStatus.Validating,
      },
      id: message.id,
      type: Messages.GetProofStatus,
    })

    if (!isValidAttestationProofMessage(message.params) || !message.signature)
      throw new GeneratorError('Invalid parameters for verification')

    const input = await createAttestationInput(
      message.params,
      message.signature
    )

    postWebViewMessage({
      data: {
        attestationMessage: message.signature.message,
        attestationProof: null,
        status: ProofResultStatus.ProofGeneration,
      },
      id: message.id,
      type: Messages.GetProofStatus,
    })

    const attestationProof = await generateAttestationProof(
      input,
      onProofProgress
    )

    postWebViewMessage({
      data: {
        attestationMessage: message.signature.message,
        attestationProof,
        status: ProofResultStatus.ProofGenerated,
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
