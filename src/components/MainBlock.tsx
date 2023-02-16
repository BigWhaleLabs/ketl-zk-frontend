import { useEffect, useState } from 'preact/hooks'
import Description from 'components/Description'
import KetlLogo from 'icons/KetlLogo'
import Messages from 'models/Messages'
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

const pasteButton = classnames(
  fontSize('text-base'),
  backgroundColor('bg-transparent'),
  borderWidth('border-2'),
  borderColor('border-white'),
  borderRadius('rounded-full'),
  padding('py-2', 'px-4')
)

const letsGoButton = classnames(
  fontSize('text-lg'),
  backgroundColor('bg-night'),
  borderRadius('rounded-full'),
  padding('py-4', 'px-6'),
  width('w-full'),
  opacity('disabled:opacity-70')
)
const errorText = classnames(baseFontSize, textColor('text-red-500'))

export default function () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  async function onCreateProof() {
    if (!token) return
    try {
      setError('')
      setLoading(true)
      const proof = await createProof(token)
      postWebViewMessage({
        type: Messages.GetProof,
        data: proof,
      })
    } catch (e) {
      console.error(e)
      if (typeof e === 'string') {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('message', (message) => setToken(message.data))
    return () =>
      window.addEventListener('message', (message) => setToken(message.data))
  }, [])

  const disableNextStep = loading || !token.length

  return (
    <div className={container}>
      <KetlLogo />
      <div className={baseFontSize}>Enter your access token</div>
      <textarea
        disabled={loading}
        value={token}
        onChange={({ target }) => setToken((target as HTMLInputElement).value)}
        placeholder="Your token goes here"
        className={textArea}
      />
      <button
        disabled={loading}
        className={pasteButton}
        onClick={() => {
          postWebViewMessage({ type: Messages.GetClipboard })
        }}
      >
        Paste from clipboard
      </button>
      <button
        className={letsGoButton}
        onClick={onCreateProof}
        disabled={disableNextStep}
      >
        {loading ? 'Loading...' : `Let's go`}
      </button>
      <Description />
      {error ? (
        <p className={errorText}>Something went wrong: {error}</p>
      ) : undefined}
    </div>
  )
}
