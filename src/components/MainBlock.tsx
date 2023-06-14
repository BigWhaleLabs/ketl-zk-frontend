import { useCallback, useEffect } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
import Message, { MessageType } from 'models/Message'
import Messages from 'models/Messages'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'
import isValidAttestationProofMessage from 'helpers/isValidAttestationProofMessage'
import isValidPasswordProofMessage from 'helpers/isValidPasswordProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import useMessageHandler from 'hooks/useMessageHandler'
import useProof from 'hooks/useProof'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2')
)

export default function MainBlock() {
  const { createAttestation, createPassword } = useProof()

  const onMessage = useCallback(
    async (message: Message) => {
      try {
        switch (message.type) {
          case MessageType.CreateAttestationProof:
            if (
              !isValidAttestationProofMessage(message.params) ||
              !message.signature
            )
              throw new Error('Invalid data for attestation proof!')
            await createAttestation(message.params, message.signature)
            break
          case MessageType.CreatePasswordProof:
            if (!isValidPasswordProofMessage(message.params))
              throw new Error('Invalid data for password proof!')
            await createPassword(message.params)
            break
          case MessageType.Status:
            postWebViewMessage({
              data: {},
              type: Messages.Ready,
            })
            break
        }
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
    },
    [createAttestation, createPassword]
  )

  useMessageHandler(onMessage)

  useEffect(() => {
    postWebViewMessage({
      data: {},
      type: Messages.Ready,
    })
  }, [])

  return (
    <div className={container}>
      <KetlLogo />
      <Description />
    </div>
  )
}
