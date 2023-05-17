import { useEffect, useState } from 'preact/hooks'
import Message from 'models/Message'
import isDataInMessage from 'helpers/isDataInMessage'

function isMessage(data: object): data is Message {
  return 'type' in data
}

export default function useMessageHandler(
  onMessage: (message: Message) => void
) {
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    if (!message) return

    const data = JSON.parse(message)

    if (isMessage(data)) onMessage(data)
  }, [message, onMessage])

  useEffect(() => {
    const handleMessage = (message: unknown) => {
      if (!isDataInMessage(message)) return
      const { data } = message as {
        data: string
      }

      setMessage(data)
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
}
