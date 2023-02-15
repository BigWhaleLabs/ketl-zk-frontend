export default interface WebViewWindow extends Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void
  }
}
