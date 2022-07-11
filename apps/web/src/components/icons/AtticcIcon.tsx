import { IIconProps } from './iconInterface'

export const AtticcIcon = (props: IIconProps) => {
  let filledColor = '#600B18'
  if (props.color !== undefined) filledColor = props.color.main
  return (
    <svg
      width={props.width === undefined ? '267' : props.width}
      height={props.height === undefined ? '267' : props.height}
      viewBox="0 0 267 267"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M174.973 185.409C164.131 198.149 148.273 205.468 131.603 205.468C106.258 205.468 83.7594 188.391 76.8472 163.995V163.859L60.1767 160.2L60.3122 160.742C63.1584 177.412 71.8325 192.728 84.7082 203.841C97.8549 215.091 114.525 221.19 131.738 221.19C155.727 221.19 178.09 209.263 191.644 189.475L191.915 189.068L175.109 185.409H174.973Z"
        fill="#F26E21"
      />
      <path
        d="M182.021 59.9055C166.841 59.9055 154.643 72.239 154.643 87.2832C154.643 102.327 166.977 114.661 182.021 114.661C197.065 114.661 209.398 102.327 209.398 87.2832C209.398 72.239 197.2 59.9055 182.021 59.9055ZM193.948 87.4187C193.948 93.9243 188.662 99.3456 182.021 99.3456C175.38 99.3456 170.094 94.0598 170.094 87.4187C170.094 80.7776 175.38 75.4918 182.021 75.4918C188.662 75.4918 193.948 80.9131 193.948 87.4187Z"
        fill={filledColor}
      />
      <path d="M186.493 142.038H139.734V157.489H186.493V170.5H202.08V123.606H186.493V142.038Z" fill={filledColor} />
      <path
        d="M87.2832 87.9611L104.36 113.577H123.064L87.1477 59.7703L52.3157 113.035L51.9091 113.577H70.4772L87.2832 87.9611Z"
        fill="#F26E21"
      />
      <path
        d="M133.5 0C59.9056 0 0 59.9056 0 133.5C0 207.094 59.9056 267 133.5 267C207.094 267 267 207.094 267 133.5C267 59.9056 207.094 0 133.5 0ZM252.769 133.5C252.769 199.234 199.234 252.769 133.5 252.769C67.7665 252.769 14.231 199.234 14.231 133.5C14.231 67.7665 67.7665 14.231 133.5 14.231C199.234 14.231 252.769 67.7665 252.769 133.5Z"
        fill={filledColor}
      />
    </svg>
  )
}
