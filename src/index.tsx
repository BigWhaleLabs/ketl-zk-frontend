import 'index.css'
import { initSentry } from 'helpers/initSentry'
import { render } from 'preact'
import App from 'App'

initSentry()
render(<App />, document.getElementById('root') as Element)
