export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('auto-height', {
    mounted: async (el) => {
      const normalHeight = el.clientHeight

      el.style.height = `${0}px`

      el.addEventListener('transitionend', () => {
        el.style.height = ''
      }, {
        once: true,
      })

      setTimeout(() => {
        el.style.height = `${normalHeight}px`
      }, 100)
    },
    beforeUnmount: async (el) => {
      el.style.height = `${el.clientHeight}px`
      await nextTick()

      await new Promise<void>((resolve) => {
        el.addEventListener('transitionend', () => {
          el.style.height = ''
          resolve()
        }, {
          once: true,
        })

        el.style.height = `${0}px`
      })
    },
  })
})
