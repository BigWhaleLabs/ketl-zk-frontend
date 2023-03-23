import {
  animation,
  classnames,
  height,
  textColor,
  width,
} from 'classnames/tailwind'

const icon = classnames(
  animation('animate-spin'),
  textColor('text-inherit'),
  width('w-4'),
  height('h-4')
)

export default function () {
  const definedSize = 16
  const halfSize = definedSize / 2
  const sizeSubOne = definedSize - 1
  const sizeByX = halfSize / 2
  const sizeByY = halfSize * 1.5
  const calculatePathD = `M${sizeSubOne} ${halfSize}C${sizeSubOne} ${sizeByX} ${sizeByY} 1 ${halfSize} 1C${sizeByX} 1 1 ${sizeByX} 1 ${halfSize}C1 ${sizeByY} ${sizeByX} ${sizeSubOne} ${halfSize} ${sizeSubOne}`

  return (
    <svg className={icon} fill="none">
      <path
        d={calculatePathD}
        stroke="url(#paint0_linear_196_49296)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_196_49296"
          x1="-0.8"
          x2="17"
          y1="9"
          y2="9"
        >
          <stop stopColor="#A301D1" />
          <stop offset="1" stopColor="#EA2F98" />
        </linearGradient>
      </defs>
    </svg>
  )
}
