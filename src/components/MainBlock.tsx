import { ChangeEvent } from 'preact/compat'
import { useEffect, useMemo, useState } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
import Loader from 'icons/Loader'
import Messages from 'models/Messages'
import TextareaAutosize from 'react-textarea-autosize'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  opacity,
  outlineColor,
  padding,
  placeholderColor,
  placeholderOpacity,
  resize,
  space,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'
import createProof from 'helpers/createProof'
import handleError from 'helpers/handleError'
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

const baseFontSize = fontSize('text-2xl')

const textArea = classnames(
  baseFontSize,
  padding('pt-6'),
  backgroundColor('bg-transparent'),
  resize('resize-none'),
  textColor('text-white'),
  placeholderColor('placeholder-gray-400'),
  placeholderOpacity('!placeholder-opacity-70'),
  textAlign('text-center'),
  outlineColor('outline-transparent')
)

const pasteButton = (active: boolean) =>
  classnames(
    fontSize('text-base'),
    backgroundColor('bg-transparent'),
    borderWidth('border-2'),
    borderColor(active ? 'border-gray-400' : 'border-white'),
    textColor(active ? 'text-gray-400' : 'text-white'),
    borderRadius('rounded-full'),
    padding('py-2', 'px-4')
  )

const letsGoButton = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  gap('gap-2'),
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const [paste, setPaste] = useState(false)
  const [pastingAttempts, setPastingAttempts] = useState(0)

  function onChangeText(text: string) {
    setToken(text.replace(/[^0-9.]/gi, ''))
  }

  async function onCreateProof() {
    if (!token) return
    try {
      setError('')
      setLoading(true)
      const data = await createProof(token)
      postWebViewMessage({
        type: Messages.GetProof,
        data,
      })
      setPastingAttempts(0)
    } catch (e) {
      console.error(e)
      setLoading(false)
      if (typeof e === 'string') {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  useEffect(() => {
    const handleMessage = (message: unknown) => {
      if (typeof message !== 'object' || !message || !('data' in message))
        return
      const { data } = message as { data: string }
      if (data === 'success') setToken('')
      else setToken(data)
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

  const disableNextStep = loading || !token.length
  const hasToken = useMemo(() => !!token.length, [token])

  return (
    <div className={container}>
      <KetlLogo />
      <div className={baseFontSize}>Enter your access token</div>
      <TextareaAutosize
        pattern="[0-9]*"
        placeholder="Your token goes here"
        minRows={2}
        maxRows={5}
        value={token}
        disabled={loading}
        className={textArea}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChangeText(event.currentTarget.value)
        }}
      />
      {!loading && (
        <button
          disabled={loading}
          className={pasteButton(paste)}
          onTouchStart={() => setPaste(true)}
          onTouchEnd={() => setPaste(false)}
          onClick={() => {
            if (hasToken) {
              setToken('')
              setPastingAttempts(0)
              return
            }
            setPastingAttempts(pastingAttempts + 1)
            postWebViewMessage({ type: Messages.GetClipboard })
          }}
        >
          {hasToken ? 'Clear token' : 'Paste from clipboard'}
        </button>
      )}
      {pastingAttempts > 0 && !token && <p>You might need to paste twice</p>}
      <button
        className={letsGoButton}
        onClick={onCreateProof}
        disabled={disableNextStep}
      >
        {loading ? 'Loading...' : `Let's go`} {loading && <Loader />}
      </button>
      {error && <p className={errorText}>{handleError(error)}</p>}
      <Description />
    </div>
  )
}
