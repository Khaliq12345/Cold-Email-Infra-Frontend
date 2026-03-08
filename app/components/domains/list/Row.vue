<template>
  <div
    class="flex flex-col md:flex-row md:items-center p-3 gap-4 justify-between border-b border-gray-100 dark:border-gray-800 last:border-0"
  >
    <div class="md:w-1/2 flex items-center gap-3">
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-2">
          <ULink
            :to="`/domains/${item.domain}`"
            class="text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600 transition-colors"
          >
            {{ item.domain }}
          </ULink>
        </div>

        <div class="flex items-center gap-2 mt-0.5">
          <span
            class="text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1"
          >
            <UIcon name="i-heroicons-envelope" class="size-3" />
            {{ item.total_mailboxes }} Mailboxes
          </span>

          <span class="text-gray-300 dark:text-gray-700 text-xs">|</span>

          <span
            class="text-xs text-gray-500 flex items-center gap-1"
            v-show="item.plusvibe_workspace"
          >
            <UButton
              :avatar="{
                src: '/plusvibe.png',
                loading: 'lazy',
              }"
              size="sm"
              color="neutral"
              variant="outline"
              :loading="
                item.plusvibe_sync_status !== 'IDLE' &&
                !!item.plusvibe_sync_status
              "
            >
              Plusvibe
            </UButton>
          </span>
        </div>
      </div>
    </div>

    <!-- // DNS CONFIG STATUS -->
    <div class="md:w-1/2 flex flex-wrap md:justify-end items-center gap-1.5">
      <span
        class="text-[10px] font-bold text-gray-400 uppercase md:hidden w-full mb-0.5"
        >Infrastructure Status</span
      >
      <UBadge
        v-for="badge in getBadgeStatus(item)"
        :key="badge.label"
        variant="subtle"
        size="md"
        :color="badge.active ? 'primary' : 'error'"
        :icon="
          !badge.active ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'
        "
        class="font-mono"
      >
        {{ badge.label }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  item: any;
}>();

// Dynamic configuration for the Sync Status Badge
const statusConfig = computed(() => {
  const status = props.item.plusvibe_sync_status;

  if (status === "VERIFYING" || status === "SENDING") {
    return {
      color: "orange" as const,
      icon: "i-heroicons-arrow-path",
      animate: true,
    };
  }
  if (status === "IDLE" && props.item.plusvibe_workspace) {
    return {
      color: "green" as const,
      icon: "i-heroicons-check-badge",
      animate: false,
    };
  }
  return {
    color: "gray" as const,
    icon: "i-heroicons-question-mark-circle",
    animate: false,
  };
});

const getBadgeStatus = (item: any) => {
  return [
    { label: "DNS", active: !!item.basic_dns },
    { label: "DKIM", active: !!item.is_dkim_set },
    {
      label: "RELAY",
      active: !!item.is_mapped_to_relay,
    },
    {
      label: "SERVER",
      active: !!item.mailcow_domain_created,
    },
    {
      label: "PAID",
      active: !!item.paid,
    },
  ];
};
</script>
