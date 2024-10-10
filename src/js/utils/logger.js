export default function logger(props) {
  const {title, data} = props

  console.group(title ? `=== ${title} ===` : '')
  console.log({
    ...data
  })
  console.groupEnd()
}
