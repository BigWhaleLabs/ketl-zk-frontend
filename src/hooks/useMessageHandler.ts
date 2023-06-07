import { useEffect, useState } from 'preact/hooks'
import Message from 'models/Message'
import isDataInMessage from 'helpers/isDataInMessage'
import isMessage from 'helpers/isMessage'

export default function useMessageHandler(
  onMessage: (message: Message) => void
) {
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    try {
      if (!message) return

      const data = JSON.parse(message)

      if (isMessage(data)) onMessage(data)
    } catch (e) {
      console.error(e)
    }
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
