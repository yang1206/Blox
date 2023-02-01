import { format } from 'date-fns'
import type { Locale } from 'date-fns'
import { zhCN } from 'date-fns/locale'
/**
 *格式化本地时间
 * @param date
 * @param formatString
 * @param locale
 * @returns
 */
export const LocalDate = (date: Date, formatString = 'yyyy-MM-dd HH:mm:ss', locale: Locale = zhCN) => {
  return format(new Date(date), formatString, { locale })
}
