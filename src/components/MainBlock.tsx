import { useState } from 'preact/hooks'
import KetlLogo from 'icons/KetlLogo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

enum Messages {
  GetClipboard,
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2'),
  padding('px-8'),
  gap('gap-2')
)
export default function () {
  const [token, setToken] = useState<string>('')

  return (
    <div
      className={container}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <KetlLogo />
      <div
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          color: '#FFFF',
        }}
      >
        Enter your access token
      </div>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Your token goes here"
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          color: '#FFFF',
          backgroundColor: 'transparent',
          resize: 'none',
        }}
      ></textarea>
      <button
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: 16,
          border: '1px solid #FFFF',
          borderRadius: 40,
          padding: '8px 16px',
          color: '#FFFF',
        }}
        onClick={async () => {
          // Get content of clipboard
          if (navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText()
            setToken(text)
          } else {
            window?.ReactNativeWebView?.postMessage(Messages.GetClipboard)
          }
        }}
      >
        Paste from clipboard
      </button>
      <button
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: 18,
          background: '#232323',
          borderRadius: '40px',
          padding: '16px 24px',
          color: '#FFFF',
          width: '100%',
        }}
      >
        Let's go
      </button>
    </div>
  )
}
