<template>
  <div v-if="domains.length > 0" class="w-full">
    <div
      class="hidden md:flex items-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800"
    >
      <div class="flex-1">Domain</div>
      <div class="flex-1 text-center">Security Status</div>
      <div class="flex-1 text-right">Actions</div>
    </div>

    <ul
      class="divide-y divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800"
    >
      <li
        v-for="item in domains"
        :key="item.domain"
        class="group hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors"
      >
        <div
          class="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4"
        >
          <div class="flex-1 flex items-center gap-3">
            <div class="p-2 bg-primary-50 dark:bg-primary-950 rounded-lg">
              <UIcon
                name="i-heroicons-globe-alt"
                class="size-5 text-primary-600"
              />
            </div>
            <div class="flex flex-col">
              <ULink
                :to="`/domains/${item.domain}`"
                class="text-sm font-bold text-gray-900 dark:text-white leading-tight"
                >{{ item.domain }}</ULink
              >

              <span class="text-xs text-gray-500 flex items-center gap-1">
                <UIcon name="i-heroicons-user" class="size-3" />
                {{ item.username }}
              </span>
            </div>
          </div>

          <div class="flex-1 flex flex-wrap md:justify-center gap-2">
            <UBadge
              v-for="type in ['ptr', 'dkim', 'dmarc', 'basic_dns'] as const"
              :key="type"
              variant="subtle"
              size="md"
              :color="item[type] ? 'success' : 'error'"
              class="font-mono px-2 py-0.5"
            >
              {{ type.toUpperCase() }}
            </UBadge>
          </div>

          <div
            class="flex-1 flex items-center justify-start md:justify-end gap-2"
          >
            <UButton
              label="Configure"
              color="black"
              variant="outline"
              size="md"
              icon="i-heroicons-wrench-screwdriver"
              class="rounded-full px-4"
              :class="item.nameserver ? '' : 'border border-red-400'"
              :disabled="!item.nameserver"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>

  <!-- Skeleton -->
  <DomainsListSkeleton v-else />
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
const toast = useToast();
const appStore = useAppStore();
const domains = ref<DomainList>([]);
async function getDomains() {
  try {
    const response = await useApi(
      `mailcow/domains/${appStore.user?.user.user_metadata.username}`,
      {},
    );

    domains.value = response as DomainList;
    console.log("domains: ", domains.value);
  } catch (error) {
    toast.add({
      title: "Error",
      description: "An error occur when getting domains, try again",
      color: "error",
    });
  }
}

onMounted(async () => {
  await getDomains();
});
</script>
