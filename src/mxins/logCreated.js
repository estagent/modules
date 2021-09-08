export default {
    created() {
        const name = this.$options.name
        if (name) {
            console.log('[created] ' + name)
        }
    },
    beforeUnmount() {
        const name = this.$options.name
        if (name) {
            console.log('[unmounted] ' + name)
        }
    },
}
