import statusCodes from './StatusCodes'

const getErrMessage = (err) => {
  if (err.response && err.response.data) {
    return (
      err.response.data.error ||
      err.response.data.message ||
      err.response.statusText
    )
  } else {
    return __('messages.loading_error', {
      code: err.response ? err.response.status : err.message,
    })
  }
}


export default (err) => {
  const errors = {}
  if (err.response) {
    if (err.response.data) {
      const data = err.response.data
      if (err.response.status === statusCodes.UNPROCESSABLE_ENTITY) {
        if (data.errors) {
          for (const key in data.errors) {
            errors[key] = data.errors[key]
          }
        } else {
          for (const key in data) {
            errors[key] = data[key]
          }
        }
      } else {
        if (data.message) {
          errors.message = [data.message]
        } else if (data.error) {
          errors.message = [data.error]
        } else if (typeof data === 'string')
          errors.message = [data]
        else
          errors.message = [__('messages.failed')]
      }
    } else {
      errors.message = [
        err.response.statusText,
      ]
    }
  } else {
    if (typeof err == 'string')
      errors.message = [err]
    else if (err.message)
      errors.message = [err.message]
    else
      errors.message = [__('messages.requestTimeOut')]
  }

  return {
    all: () => errors,
    values: () => Object.keys(errors).map(key => errors[key]),
  }
}

