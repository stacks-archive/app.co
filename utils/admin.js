import moment from 'moment'

export const monthName = (month) => {
  const date = moment(`${month.month} ${month.year}`, 'M YYYY')
  return date.format('MMMM YYYY')
}
