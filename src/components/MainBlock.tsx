import { ChangeEvent } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
import Loader from 'icons/Loader'
import Message, { MessageType } from 'models/Message'
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
import handleError from 'helpers/handleError'
import postWebViewMessage from 'helpers/postWebViewMessage'
import tokenRegex from 'helpers/tokenRegex'
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

export default function MainBlock() {
  const [token, setToken] = useState('')
  const [paste, setPaste] = useState(false)
  const [pastingAttempts, setPastingAttempts] = useState(0)
  const [validToken, setValidToken] = useState(false)

  const { createProof, error, loading, setError, setLoading } = useProof()

  const onMessage = useCallback(
    async (message: Message) => {
      switch (message.type) {
        case MessageType.CreateProof:
          await createProof(message.params, message.signature)
          setPastingAttempts(0)
          if (message.params.token) {
            onChangeText(message.params.token)
          }
          break
        case MessageType.Reset:
          setToken('')
          setLoading(false)
          break
        case MessageType.Error:
          setToken('')
          setError(`Can't generate proof. Please try again!`)
          setLoading(false)
          break
      }
    },
    [createProof, setLoading, setError]
  )

  useMessageHandler(onMessage)

  function onChangeText(text: string) {
    const parsed = text.replace(/[^0-9.]/gi, '')
    setValidToken(tokenRegex(parsed))
    setToken(parsed)
  }

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
        <button className={letsGoButton} disabled={disableNextStep}>
          Let's go
        </button>
      )}

      {error && <p className={errorText}>{handleError(error)}</p>}
      <Description />
    </div>
  )
}
