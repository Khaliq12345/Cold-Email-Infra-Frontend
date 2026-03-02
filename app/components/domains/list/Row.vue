<template>
  <div
    class="flex flex-col md:flex-row md:items-center p-2 gap-4 justify-between"
  >
    <div class="md:w-1/2 flex items-center gap-3">
      <div class="p-2 bg-primary-50 dark:bg-primary-950 rounded-lg shrink-0">
        <UIcon name="i-heroicons-globe-alt" class="size-5 text-primary-600" />
      </div>
      <div class="flex flex-col min-w-0">
        <ULink
          :to="`/domains/${item.domain}`"
          class="text-sm font-bold text-gray-900 dark:text-white truncate"
        >
          {{ item.domain }}
        </ULink>
        <span class="text-xs text-gray-500 flex items-center gap-1">
          <UIcon name="i-heroicons-user" class="size-3" />
          {{ item.username }}
        </span>
      </div>
    </div>

    <div class="md:w-1/2 flex flex-wrap md:justify-end items-center gap-2">
      <span
        class="text-[10px] font-bold text-gray-400 uppercase md:hidden w-full mb-1"
        >Status</span
      >

      <UBadge
        v-for="badge in getBadgeStatus(item)"
        :key="badge.label"
        variant="subtle"
        size="md"
        :color="badge.active ? 'success' : 'error'"
        :icon="
          !badge.active
            ? 'i-heroicons-arrow-path-20-solid'
            : 'i-heroicons-check-20-solid'
        "
        class="font-mono px-2 py-0.5"
      >
        {{ badge.label.toUpperCase() }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();

const getBadgeStatus = (item: any) => {
  return [
    { label: "dns", active: !!item.basic_dns },
    { label: "ns", active: !!item.nameserver },
    { label: "dkim", active: !!item.is_dkim_set },
    {
      label: "mailserver",
      active: !!(item.mailcow_domain_created && item.mailcow_relay_set),
    },
  ];
};
</script>
