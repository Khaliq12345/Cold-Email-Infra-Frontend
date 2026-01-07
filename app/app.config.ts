export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    authForm: {
      slots: {
        root: 'space-y-2',
        body: 'bg-monoc-100 dark:bg-monoc-900 p-4 rounded',
      }
    }
  }
})
