import classnames, {
  blur,
  height,
  objectFit,
  position,
  scale,
  width,
  zIndex,
} from 'classnames/tailwind'

const videoBackground = classnames(
  zIndex('-z-10'),
  position('fixed'),
  height('h-screen'),
  width('w-screen'),
  objectFit('object-cover'),
  blur('blur'),
  scale('scale-110')
)

export default function () {
  return (
    <video className={videoBackground} autoPlay loop>
      <source src="login_screen.mp4" type="video/mp4" />
    </video>
  )
}
