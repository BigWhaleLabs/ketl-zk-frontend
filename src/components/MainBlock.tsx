import { useState } from 'preact/hooks'
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
  textColor,
} from 'classnames/tailwind'
import postWebViewMessage from 'helpers/postWebViewMessage'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2'),
  textColor('text-white')
)

export default function () {
  const [token, setToken] = useState<string | null>('')

  return (
    <div className={container}>
      <KetlLogo />
      <div
        style={{
          fontSize: 24,
        }}
      >
        Enter your access token
      </div>
      <textarea
        value={token || ''}
        onChange={(e) => setToken((e.target as HTMLInputElement).value)}
        placeholder="Your token goes here"
        style={{
          fontSize: 24,
          backgroundColor: 'transparent',
          resize: 'none',
        }}
      />
      <button
        style={{
          fontSize: 16,
          border: '1px solid #FFFF',
          borderRadius: 40,
          padding: '8px 16px',
        }}
        onClick={async () => {
          // Get content of clipboard
          if (navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText()
            setToken(text)
          } else {
            postWebViewMessage(Messages.GetClipboard)
          }
        }}
      >
        Paste from clipboard
      </button>
      <button
        style={{
          fontSize: 18,
          background: '#232323',
          borderRadius: '40px',
          padding: '16px 24px',
          width: '100%',
        }}
      >
        Let's go
      </button>
    </div>
  )
}
