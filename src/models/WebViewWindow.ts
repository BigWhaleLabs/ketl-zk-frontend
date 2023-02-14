import Messages from 'models/Messages'

export default interface WebViewWindow extends Window {
  ReactNativeWebView: {
    postMessage: (message: Messages) => void
  }
}
