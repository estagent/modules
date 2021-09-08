export default (error) => {
  const errors = {}
  if (error.response && error.response.data) {

    const data = error.response.data

    if (error.response.status === 422) {
      if (data.errors) {
        for (const key in data.errors) {
          errors[key] = data.errors[key]
        }
      } else {
        for (const key in data) {
          errors[key] = data[key]
        }
      }
    } else {<
      if (data.message) {
        errors.message = [data.message]
      } else if (data.error) {
        errors.message = [data.error]
      } else if (typeof data === 'string')
        errors.message = [data]
      else
        errors.message = [__('messages.failed')]
    }
  } else errors.message = ['unknown error']

  return {
    all: () => errors,
    values: () => Object.keys(errors).map(key => errors[key]),
  }
}
