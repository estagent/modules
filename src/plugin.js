import {endOfDate, endOfDay, startOfDate, startOfDay} from './dates'
import formatters from './formatters'
import form from './form'
export default {
  install(vue) {
    Object.defineProperty(vue.config.globalProperties, '$form', {
      get: () => form,
    })
    Object.defineProperty(vue.config.globalProperties, '$formatters', {
      get: () => formatters,
    })
    Object.defineProperty(vue.config.globalProperties, '$errorReporter', {
      get: () => errorReporter,
    })
    Object.defineProperty(vue.config.globalProperties, '$startOfDate', {
      get: () => startOfDate,
    })
    Object.defineProperty(vue.config.globalProperties, '$startOfDay', {
      get: () => startOfDay,
    })
    Object.defineProperty(vue.config.globalProperties, '$endOfDate', {
      get: () => endOfDate,
    })
    Object.defineProperty(vue.config.globalProperties, '$endOfDay', {
      get: () => endOfDay,
    })
  },
}
