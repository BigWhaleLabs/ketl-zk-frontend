import { useState } from 'preact/hooks'
import AvailableScreen from 'models/AvailableScreen'
import Messages from 'models/Messages'
import classnames, {
  borderColor,
  borders,
  fontSize,
  padding,
  textAlign,
  textColor,
  textDecoration,
  touchAction,
  userSelect,
} from 'classnames/tailwind'
import postWebViewMessage from 'helpers/postWebViewMessage'

const description = classnames(fontSize('text-sm'), textAlign('text-center'))
const wrapper = classnames(
  description,
  padding('pt-4'),
  borders('border-t'),
  borderColor('border-gray-400')
)
const descriptionLink = (active?: boolean) =>
  classnames(
    description,
    touchAction('touch-none'),
    userSelect('select-none'),
    textColor(active ? 'text-link-hover' : 'text-link'),
    textDecoration(active ? 'underline' : 'no-underline')
  )

export default function () {
  const [touch, setTouch] = useState<AvailableScreen | null>()

  const onClickLink = (link: AvailableScreen) => {
    postWebViewMessage({
      data: link,
      type: Messages.OpenLink,
    })
  }
  const spanOptions = (screen: AvailableScreen) => ({
    onClick: () => onClickLink(screen),
    onTouchEnd: () => setTouch(null),
    onTouchStart: () => setTouch(screen),
  })

  return (
    <div className={wrapper}>
      By entering a token, you accept the{' '}
      <span
        className={descriptionLink(touch === 'Terms')}
        {...spanOptions('Terms')}
      >
        terms of service
      </span>{' '}
      and{' '}
      <span
        className={descriptionLink(touch === 'Privacy')}
        {...spanOptions('Privacy')}
      >
        privacy policy
      </span>
      .
    </div>
  )
}
