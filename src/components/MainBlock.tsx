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
  outlineColor,
  padding,
  placeholderColor,
  placeholderOpacity,
  resize,
  space,
  textAlign,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import createProof from 'helpers/createProof'
import handleError from 'helpers/handleError'
import isDataInMessage from 'helpers/isDataInMessage'
import postWebViewMessage from 'helpers/postWebViewMessage'
import tokenRegex from 'helpers/tokenRegex'

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
const enterYourToken = classnames(
  baseFontSize,
  textColor('text-primary-light'),
  textAlign('text-center')
)

const textArea = (isValid: boolean) =>
  classnames(
    baseFontSize,
    padding('pt-6'),
    backgroundColor('bg-transparent'),
    resize('resize-none'),
    textColor(isValid ? 'text-white' : 'text-gray-300'),
    placeholderColor('placeholder-gray-400'),
    placeholderOpacity('placeholder-opacity-70'),
    textAlign('text-center'),
    outlineColor('outline-transparent'),
    transitionProperty('transition-colors')
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
  gap('gap-x-3'),
  fontSize('text-lg'),
  backgroundColor('bg-night'),
  borderRadius('rounded-full'),
  padding('py-4', 'px-6'),
  width('w-full')
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
  const [validToken, setValidToken] = useState(false)

  function onChangeText(text: string) {
    const parsed = text.replace(/[^0-9.]/gi, '')
    setValidToken(tokenRegex(parsed))
    setToken(parsed)
  }

  async function onCreateProof() {
    if (!token) return
    try {
      setError('')
      setLoading(true)
      const data = await createProof(token)
      postWebViewMessage({
        data,
        type: Messages.GetProof,
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
      if (!isDataInMessage(message)) return
      const { data } = message as { data: string }
      if (data === 'success') setToken('')
      else onChangeText(data)
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

  const disableNextStep = loading || !validToken
  const hasToken = useMemo(() => !!token.length, [token])

  return (
    <div className={container}>
      <KetlLogo />
      <div className={enterYourToken}>Enter your access token</div>
      <TextareaAutosize
        className={textArea(validToken)}
        disabled={loading}
        maxRows={5}
        minRows={2}
        pattern="[0-9]*"
        placeholder="Your token goes here"
        value={token}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChangeText(event.currentTarget.value)
        }}
      />
      {!loading && (
        <button
          className={pasteButton(paste)}
          disabled={loading}
          onTouchEnd={() => setPaste(false)}
          onTouchStart={() => setPaste(true)}
          onClick={() => {
            if (hasToken) {
              onChangeText('')
              setPastingAttempts(0)
              return
            }
            postWebViewMessage({ type: Messages.GetClipboard })
            setTimeout(() => setPastingAttempts(pastingAttempts + 1), 100)
          }}
        >
          {hasToken ? 'Clear token' : 'Paste from clipboard'}
        </button>
      )}
      {!token && pastingAttempts > 0 && <p>You might need to paste twice</p>}
      {loading ? (
        <Loader />
      ) : (
        <button
          className={letsGoButton}
          disabled={disableNextStep}
          onClick={onCreateProof}
        >
          Let's go
        </button>
      )}

      {error && <p className={errorText}>{handleError(error)}</p>}
      <Description />
    </div>
  )
}
