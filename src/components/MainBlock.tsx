import { useState } from 'preact/hooks'
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
  padding,
  resize,
  space,
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
  backgroundColor('bg-transparent'),
  resize('resize-none'),
  textColor('text-white')
)

const button = classnames(
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
  width('w-full')
)

export default function () {
  const [token, setToken] = useState('')

  async function onCreateProof() {
    if (token)
      postWebViewMessage({
        type: Messages.GetProof,
        data: await createProof(token),
      })
  }

  return (
    <div className={container}>
      <KetlLogo />
      <div className={baseFontSize}>Enter your access token</div>
      <textarea
        value={token || ''}
        onChange={({ target }) => setToken((target as HTMLInputElement).value)}
        placeholder="Your token goes here"
        className={textArea}
      />
      <button
        className={button}
        onClick={async () => {
          if (navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText()
            setToken(text)
          } else {
            postWebViewMessage({ type: Messages.GetClipboard })
          }
        }}
      >
        Paste from clipboard
      </button>
      <button className={letsGoButton} onClick={onCreateProof}>
        Let's go
      </button>
    </div>
  )
}
