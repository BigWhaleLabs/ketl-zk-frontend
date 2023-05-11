import { useEffect, useState } from 'preact/hooks'
import KetlLogo from 'icons/KetlLogo'
import Messages from 'models/Messages'
import classnames, {
  alignItems,
  backgroundColor,
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
import VerificationMessage from 'models/VerificationMessage'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2'),
  backgroundColor('!bg-black')
)

export default function Founder() {
  const [data, setData] = useState<VerificationMessage>()
  useEffect(() => {
    const handleMessage = (message: unknown) => {
      if (!isDataInMessage(message)) return
      const { data } = message as {
        data: VerificationMessage
      }

      setData(data)
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

  useEffect(() => {
    if (data) {
      void createFounderProof(data.type, data.params)
        .then((proof) => {
          postWebViewMessage({
            data: proof,
            type: Messages.GetFounderProof,
          })
        })
        .catch((e) => {
          postWebViewMessage({
            data: {
              message: `Can't generate valid proof with this token`,
              e: JSON.stringify(e, Object.getOwnPropertyNames(e)),
            },
            type: Messages.GetFounderProofError,
          })
        })
    }
  }, [data])

  return <div className={container}><KetlLogo /></div>
}
