<template>
  <UCard>
    <template #header>
      <DomainsListHeader />
    </template>
    <template #default>
      <DomainsListBody :domains-list="domainsList" />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { DomainList } from '~/types/domain'

defineProps<{
  domainsList: DomainList
}>()
</script>