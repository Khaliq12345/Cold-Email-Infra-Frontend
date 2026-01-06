export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    avatar: {
      slots: {
        root: 'bg-monoc-300 dark:bg-monoc-900 text-center',
        fallback: 'text-center text-black dark:text-white'
      }
    }
  }
})
