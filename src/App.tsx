import MainBlock from 'components/MainBlock'
import Root from 'components/Root'

export default function () {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <video
        className="videoTag"
        autoPlay
        loop
        muted
        style={{
          zIndex: -1,
          position: 'fixed',
          float: 'left',
          top: 0,
          padding: 0,
          filter: 'blur(5px)',
          objectFit: 'cover',
          width: '100vw',
          height: '100vh',
          left: 0,
        }}
      >
        <source src="login_screen.mp4" type="video/mp4" />
      </video>
      <Root>
        <MainBlock />
      </Root>
    </div>
  )
}
