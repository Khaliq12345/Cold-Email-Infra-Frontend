<template>
  <UPageList>
    <div
      v-for="domain in domainsList"
      :key="domain.value"
      class="p-3 sm:p-2 rounded-2xl"
    >
      <!-- Mobile layout -->
      <div class="sm:hidden">
        <div class="flex justify-between items-center mb-2">
          <div class="flex gap-2 items-center">
            <div
              class="w-6 h-6 rounded shrink-0"
              :style="{ backgroundColor: domain.color }"
            ></div>
            <ULink
              as="button"
              class="font-medium text-sm truncate"
              :to="`/domains/${domain.name}`"
              >{{ domain.name }}</ULink
            >
            <ClientOnly>
              <p
                v-if="Math.random() > 0.7"
                class="px-1 py-0.5 text-xs bg-red-500 text-white rounded shrink-0"
              >
                Expired
              </p>
            </ClientOnly>
          </div>
          <UIcon name="i-lucide-ellipsis-vertical" class="w-5 h-5" />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">100/100 inboxes</p>
      </div>

      <!-- Desktop layout -->
      <div class="hidden sm:grid sm:grid-cols-3 sm:items-center sm:gap-1">
        <div class="flex gap-2 items-center">
          <div
            class="w-8 h-8 rounded shrink-0"
            :style="{ backgroundColor: domain.color }"
          ></div>
          <ULink
            as="button"
            class="font-medium text-sm truncate"
            :to="`/domains/${domain.name}`"
            >{{ domain.name }}</ULink
          >
          <ClientOnly>
            <p
              v-if="Math.random() > 0.7"
              class="px-1 py-0.5 text-xs bg-red-500 text-white rounded shrink-0"
            >
              Expired
            </p>
          </ClientOnly>
        </div>
        <p
          class="text-base text-gray-600 dark:text-gray-400 justify-self-center"
        >
          100/100 inboxes
        </p>
        <div class="justify-self-end">
          <UIcon name="i-lucide-ellipsis-vertical" class="w-5 h-5" />
        </div>
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
