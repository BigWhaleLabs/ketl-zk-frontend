import Messages from 'models/Messages'
import WebViewWindow from 'models/WebViewWindow'

declare const window: WebViewWindow

interface PostMessage {
  id?: string
  type: Messages
  data?: unknown
  error?: unknown
  message?: string
}

export default function postWebViewMessage(message: PostMessage) {
  return window?.ReactNativeWebView?.postMessage(JSON.stringify(message))
}
