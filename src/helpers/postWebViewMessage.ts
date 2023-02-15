import Messages from 'models/Messages'
import WebViewWindow from 'models/WebViewWindow'

declare const window: WebViewWindow

interface PostMessage {
  type: Messages
  data?: unknown
}

export default (message: PostMessage) => {
  return window?.ReactNativeWebView?.postMessage(JSON.stringify(message))
}
