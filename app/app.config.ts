export default defineAppConfig({
  ui: {
    input: {
      color: {
        white: {
          outline: 'dark:bg-black/20',
        },
      },
    },
    select: {
      color: {
        white: {
          outline: 'dark:bg-black/20',
        },
      },
    },
    selectMenu: {
      background: 'dark:bg-[rgb(var(--color-primary-900))]',
      ring: 'dark:ring-[rgb(var(--color-primary-800))]',
      option: {
        active: 'dark:bg-[rgb(var(--color-primary-800))]',
      },
    },
    tooltip: {
      background: 'dark:bg-[rgb(var(--color-primary-900))]',
      ring: 'dark:ring-[rgb(var(--color-primary-500))]',
    },
  },
})
