import { useEffect } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  opacity,
  padding,
  space,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'
import createFounderProof from 'helpers/createFounderProof'
import postWebViewMessage from 'helpers/postWebViewMessage'
import Messages from 'models/Messages'
import { VerificationType } from 'helpers/requestSignature'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2')
)

const letsGoButton = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-x-3'),
  fontSize('text-lg'),
  backgroundColor('bg-night'),
  borderRadius('rounded-full'),
  padding('py-4', 'px-6'),
  width('w-full'),
  opacity('disabled:opacity-70')
)
const errorText = classnames(
  textColor('text-red-500'),
  textAlign('text-center')
)

export default function () {
  useEffect(() => {
    const handleMessage = (message: unknown) => {
      if (typeof message !== 'object' || !message || !('data' in message))
        return
      const { data } = message as { data: { type: VerificationType, params: object } }

      createFounderProof(data.type, data.params).then((proof) => postWebViewMessage({
        data: proof,
        type: Messages.GetTwitterProof,
      }))
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
