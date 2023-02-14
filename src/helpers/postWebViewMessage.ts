import WebViewWindow from 'models/WebViewWindow'

declare const window: WebViewWindow

export default window?.ReactNativeWebView?.postMessage
