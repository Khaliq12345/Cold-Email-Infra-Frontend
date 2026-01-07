<template>
  <UPageList>
    <div
      v-for="domain in domainsList"
      :key="domain.value"
      class="grid grid-cols-3 items-center gap-1 p-2 rounded-2xl"
    >
      <div class="flex gap-2 items-center">
        <div
          class="w-8 h-8 rounded"
          :style="{ backgroundColor: domain.color }"
        ></div>
        <p class="font-medium">{{ domain.name }}</p>
        <p v-if="Math.random() > 0.7" class="px-1 py-0.5 text-xs bg-red-500 rounded ">Expired</p>
      </div>
      <p class="justify-self-center">100/100 inboxes</p>
      <div class="justify-self-end">
        <UIcon name="i-lucide-ellipsis-vertical" />
      </div>
    </div>
  </UPageList>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

defineProps<{
  domainsList: DomainList;
}>();
</script>
