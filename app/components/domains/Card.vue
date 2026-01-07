<template>
    <UCard>
      <template #header>
        <DomainsChartHeader />
      </template>
      <template #default>
        <DomainsChartBody :domains-list="domainsList" />
      </template>
    </UCard>
  </template>
  
  <script lang="ts" setup>
  import type { DomainList } from '~/types/domain'
  
  defineProps<{
    domainsList: DomainList
  }>()
  </script>
  
  <style>
  
  </style>