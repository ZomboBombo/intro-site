/* eslint-disable no-console */
interface ILoggerProps {
  title?: string
  data: any
}

export default function logger({ title = 'Logger Title', data }: ILoggerProps) {
  console.group(`=== ${title} ===`)
  console.log({
    ...data
  })
  console.groupEnd()
}
