import Preference from '@revgaming/preference'

export default {
  currencyAmount(currency_code, amount) {
    amount.toLocaleString(Preference.locale(), {
      style: 'currency',
      currency: currency_code,
    })
  },
}
