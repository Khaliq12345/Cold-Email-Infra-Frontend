<template>
  <UCard>
    <template #header>
      <DomainsListHeader />
    </template>
    <template #default>
      <DomainsListBody />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { DomainList } from '~/types/domain'

const domains = ref<DomainList>([])

async function getDomains() {
  const { data, error } = await useApi("mailcow/domains/khaliq")
  if(error.value) {}
}

</script>