<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-lg bg-blue-500 flex items-center justify-center">
          <Icon name="i-lucide-globe" class="text-white p-2" size="30"/>
        </div>
        <div>
          <h1 class="text-xl font-bold">{{ domainInfo?.domain_name || name }}</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ domainInfo?.description }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton variant="outline" size="sm">Settings</UButton>
        <UButton color="primary" size="sm">Manage</UButton>
      </div>
    </div>
    <div class="grid grid-cols-4 sm:grid-cols-4 gap-2 p-2">
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
        <p class="font-medium text-sm">{{ domainInfo?.active ? 'Active' : 'Inactive' }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Messages</p>
        <p class="font-medium text-sm">{{ domainInfo?.msgs_total || '0' }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Mailboxes Left</p>
        <p class="font-medium text-sm">{{ domainInfo?.mboxes_left || '0' }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Created</p>
        <p class="font-medium text-sm">{{ formatDate(domainInfo?.created) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomainInfo } from '~/types/domain'

interface Props {
  name: string | null
  domainInfo?: DomainInfo | null
}

defineProps<Props>()

function formatDate(dateStr?: string) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString()
}
</script>