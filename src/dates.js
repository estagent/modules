export const startOfDay = (val) => {
  if (!val) return val
  const day = new Date(val)
  day.setHours(0, 0, 0, 0)
  return day
}

export const endOfDay = (val) => {
  if (!val) return val
  const day = new Date(val)
  day.setHours(23, 59, 59, 999)
  return day
}


export const startOfDate = (val) => {
  if (!val) return val
  const date = new Date()

  switch (val) {
    case 'day':
    case 'today':
      date.setHours(0, 0, 0, 0)
      return date
    case 'yesterday':
      date.setDate(date.getDate() - 1)
      date.setHours(0, 0, 0, 0)
      return date
    case 'tomorrow':
      date.setDate(date.getDate() + 1)
      date.setHours(0, 0, 0, 0)
      return date
    case 'week':
      const day = new Date(date.setDate(date.getDate() - date.getDay() + 1))
      day.setHours(0, 0, 0, 0)
      return day
    case 'hour':
      date.setHours(date.getHours(), 0, 0, 0)
      return date
    case 'month':
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
      return date
    case 'year':
      return new Date(date.getFullYear(), 0)
    default:
      throw `value (${val}) unknown date string`
  }
}

export const endOfDate = (val) => {
  if (!val) return val
  const date = new Date()
  switch (val) {
    case 'day':
    case 'today':
      date.setHours(23, 59, 59, 999)
      return date
    case 'yesterday':
      date.setDate(date.getDate() - 1)
      date.setHours(23, 59, 59, 999)
      return date
    case 'tomorrow':
      date.setDate(date.getDate() + 1)
      date.setHours(23, 59, 59, 999)
      return date
    case 'hour':
      date.setHours(date.getHours(), 59, 59, 999)
      return date
    case 'week':
      const week = new Date(date.setDate(date.getDate() - date.getDay() + 6))
      week.setHours(23, 59, 59, 999)
      return week
    case 'month':
      const month = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      month.setHours(23, 59, 59, 999)
      return month
    case 'year':
      return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)
    default:
      throw `value (${val}) unknown date string`
  }

  return date
}
