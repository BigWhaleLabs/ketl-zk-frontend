import { useState } from 'preact/hooks'
import AvailableStepFlow from 'models/AvailableStepFlow'
import Messages from 'models/Messages'
import classnames, {
  fontSize,
  textAlign,
  textColor,
  textDecoration,
  touchAction,
  userSelect,
} from 'classnames/tailwind'
import postWebViewMessage from 'helpers/postWebViewMessage'

const description = classnames(fontSize('text-sm'), textAlign('text-center'))
const descriptionLink = (active?: boolean) =>
  classnames(
    description,
    touchAction('touch-none'),
    userSelect('select-none'),
    textColor(active ? 'text-link-hover' : 'text-link'),
    textDecoration(active ? 'underline' : 'no-underline')
  )

export default function () {
  const [touch, setTouch] = useState<string | null>()

  const onClickLink = (link: AvailableStepFlow) => {
    postWebViewMessage({
      type: Messages.OpenLink,
      data: link,
    })
  }
  const spanOptions = (flow: AvailableStepFlow) => ({
    onTouchStart: () => setTouch(flow),
    onTouchEnd: () => setTouch(null),
    onClick: () => onClickLink(flow),
  })

  return (
    <div className={description}>
      By entering a token, you accept the{' '}
      <span
        className={descriptionLink(touch === 'terms')}
        {...spanOptions('terms')}
      >
        terms of service
      </span>{' '}
      and{' '}
      <span
        className={descriptionLink(touch === 'privacy')}
        {...spanOptions('privacy')}
      >
        privacy policy
      </span>
      .
    </div>
  )
}
