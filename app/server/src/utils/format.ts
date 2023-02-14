import { format as dateFormatFn } from 'date-fns'

export const dateFormat = (date = null, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (date === null || date === undefined)
    date = new Date()

  const t = date instanceof Date ? date : new Date(date)

  return dateFormatFn(t, format)
}
