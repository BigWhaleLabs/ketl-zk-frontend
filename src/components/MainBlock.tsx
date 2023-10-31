import { useCallback, useEffect } from 'preact/hooks'
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
import onCreateAttestationProofMessage from 'helpers/onCreateAttestationProofMessage'
import onCreatePasswordProofMessage from 'helpers/onCreatePasswordProofMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import useMessageHandler from 'hooks/useMessageHandler'

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
  const onMessage = useCallback(async (message: Message) => {
    switch (message.type) {
      case MessageType.CreateAttestationProof:
        await onCreateAttestationProofMessage(message)
        break
      case MessageType.CreatePasswordProof:
        await onCreatePasswordProofMessage(message)
        break
    }
  }, [])

  useMessageHandler(onMessage)

  useEffect(() => {
    const interval = setInterval(() => {
      postWebViewMessage({
        data: {},
        type: Messages.Ready,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={container}>
      <KetlLogo />
    </div>
  )
}
