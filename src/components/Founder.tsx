import { VerificationType } from 'helpers/requestSignature'
import { useEffect } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
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
import createFounderProof from 'helpers/createFounderProof'
import isDataInMessage from 'helpers/isDataInMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2')
)

export default function Founder() {
  useEffect(() => {
    const handleMessage = (message: unknown) => {
      if (!isDataInMessage(message)) return
      const { data } = message as {
        data: { type: VerificationType; params: object }
      }

      void createFounderProof(data.type, data.params).then((proof) =>
        postWebViewMessage({
          data: proof,
          type: Messages.GetTwitterProof,
        })
      )
    }

    if (navigator.userAgent.includes('Android')) {
      document.addEventListener('message', handleMessage)
    } else {
      window.addEventListener('message', handleMessage)
    }
    return () => {
      window.onmessage = handleMessage
      if (navigator.userAgent.includes('Android')) {
        document.removeEventListener('message', handleMessage)
      } else {
        window.removeEventListener('message', handleMessage)
      }
    }
  }, [])

  return (
    <div className={container}>
      <KetlLogo />
      <Description />
    </div>
  )
}
