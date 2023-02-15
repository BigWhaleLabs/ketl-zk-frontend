import { Redirect, Route, Router, Switch } from 'wouter'
import BackgroundVideo from 'components/BackgroundVideo'
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

export default function () {
  return (
    <div className={mainContainer}>
      <BackgroundVideo />
      <Root>
        <Router hook={useHashLocation}>
          <Switch>
            <Route path="/allow-map" component={MainBlock} />
            <Route path="">
              <Redirect to="/allow-map" />
            </Route>
          </Switch>
        </Router>
      </Root>
    </div>
  )
}
