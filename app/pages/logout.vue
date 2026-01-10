<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  const appStore = useAppStore()
  appStore.logout()
  navigateTo("/login")
})
</script>

<style>

</style>