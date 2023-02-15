import Messages from 'models/Messages'

interface PostMessage {
  type: Messages
  data?: string
}

export default interface WebViewWindow extends Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void
  }
}
