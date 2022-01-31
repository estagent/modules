import Preference from '@revgaming/preference'

export default {
  currencyAmount(currency_code, amount, decimals = 2) {
    return amount.toLocaleString(Preference.locale(), {
      style: 'currency',
      currency: currency_code.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    })
  },
  formatDate(date) {
    if (!date)
      return ''
    if (!(date instanceof Date))
      date = new Date(date)
    return date
      .toLocaleString(Preference.locale(), {
        day: '2-digit', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: '2-digit', // numeric, 2-digit, long, short, narrow
      })
  },
  formatTime(date) {
    if (!date)
      return ''
    if (!(date instanceof Date))
      date = new Date(date)
    return date
      .toLocaleString(Preference.locale(), {
        day: '2-digit', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: '2-digit', // numeric, 2-digit, long, short, narrow
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
  },
}
