import { Redirect, Route, Router, Switch } from 'wouter'
import Founder from 'components/Founder'
import MainBlock from 'components/MainBlock'
import Root from 'components/Root'
import classnames, {
  alignItems,
  display,
  height,
  justifyContent,
} from 'classnames/tailwind'
import useHashLocation from 'hooks/useHashLocation'

const mainContainer = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  height('h-screen')
)

export default function App() {
  return (
    <div className={mainContainer}>
      <Root>
        <Router hook={useHashLocation}>
          <Switch>
            <Route component={MainBlock} path="/allow-map" />
            <Route component={Founder} path="/yc" />
            <Route>
              <Redirect to="/allow-map" />
            </Route>
          </Switch>
        </Router>
      </Root>
    </div>
  )
}
