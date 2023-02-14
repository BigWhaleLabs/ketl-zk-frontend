import BackgroundVideo from 'components/BackgroundVideo'
import MainBlock from 'components/MainBlock'
import Root from 'components/Root'
import classnames, {
  alignItems,
  display,
  height,
  justifyContent,
} from 'classnames/tailwind'

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
        <MainBlock />
      </Root>
    </div>
  )
}
