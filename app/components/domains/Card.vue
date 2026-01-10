<template>
    <UCard>
      <template #header>
        <DomainsChartHeader />
      </template>
      <template #default>
        <DomainsChartBody />
      </template>
    </UCard>
  </template>
  
  <script lang="ts" setup>
  import type { DomainList } from '~/types/domain'

  </script>
  
  <style>
  
  </style>