import cloneDeep from 'lodash.clonedeep'
import {request} from '@revgaming/session'
import {reactive} from 'vue'

export default function (...args) {
    const data = (typeof args[0] === 'string' ? args[1] : args[0]) || {}
    let defaults = cloneDeep(data)
    let recentlySuccessfulTimeoutId = null
    let transform = data => data

    let form = reactive({
        // return {
        isDirty: false,
        hasErrors: false,
        processing: false,
        progress: null,
        wasSuccessful: false,
        recentlySuccessful: false,
        data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key]
                return carry
            }, {})
        },
        errors: {},
        transform(callback) {
            transform = callback
            return this
        },
        reset(...fields) {
            let clonedDefaults = cloneDeep(defaults)
            if (fields.length === 0) {
                Object.assign(this, clonedDefaults)
            } else {
                Object.assign(
                    this,
                    Object.keys(clonedDefaults)
                        .filter(key => fields.includes(key))
                        .reduce((carry, key) => {
                            carry[key] = clonedDefaults[key]
                            return carry
                        }, {}),
                )
            }

            return this
        },
        clearErrors(...fields) {
            this.errors = Object.keys(this.errors).reduce(
                (carry, field) => ({
                    ...carry,
                    ...(fields.length > 0 && !fields.includes(field)
                        ? {[field]: this.errors[field]}
                        : {}),
                }),
                {},
            )

            this.hasErrors = Object.keys(this.errors).length > 0

            return this
        },
        get(url, options) {
            return this.submit('get', url, options)
        },
        post(url, options) {
            return this.submit('post', url, options)
        },
        put(url, options) {
            return this.submit('put', url, options)
        },
        patch(url, options) {
            return this.submit('patch', url, options)
        },
        delete(url, options) {
            return this.submit('delete', url, options)
        },
        submit(method, url, options = {}) {
            const data = transform(this.data())
            const _options = {
                ...options,
            }

            this.wasSuccessful = false
            this.recentlySuccessful = false
            clearTimeout(recentlySuccessfulTimeoutId)

            this.processing = true
            this.clearErrors()

            return request[method](url, data, _options)
                .then(response => {
                    this.processing = false
                    this.progress = null
                    this.wasSuccessful = true
                    this.recentlySuccessful = true
                    recentlySuccessfulTimeoutId = setTimeout(
                        () => (this.recentlySuccessful = false),
                        2000,
                    )

                    const onSuccess = options.onSuccess ? options.onSuccess(response) : null

                    defaults = cloneDeep(this.data())
                    this.isDirty = false
                    return options.onSuccess ? onSuccess : response

                })
                .catch(error => {
                    this.processing = false
                    this.progress = null
                    this.hasErrors = true

                    if (error.response && error.response.data) {
                        const data = error.response.data

                        if (error.response.status === 422) {
                            if (data.errors) {
                                for (const key in data.errors) {
                                    this.errors[key] = data.errors[key][0]
                                }
                            } else {
                                for (const key in data) {
                                    this.errors[key] = data[key][0]
                                }
                            }
                        } else {
                            if (data.message) {
                                this.errors.message = data.message
                            } else if (data.error) {
                                this.errors.message = data.error
                            }
                        }
                    } else this.errors.message = __('messages.failed')

                    if (options.onError) {
                        return options.onError(this.errors)
                    } else throw error
                })
        },
    })
    return form.reset()
}