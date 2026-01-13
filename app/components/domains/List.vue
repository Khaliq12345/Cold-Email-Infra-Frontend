<template>
  <UCard>
    <template #header>
      <DomainsListHeader @refresh="refreshing++" />
    </template>
    <template #default>
      <DomainsListBody :key="refreshing" />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const refreshing = ref(0);
</script>
