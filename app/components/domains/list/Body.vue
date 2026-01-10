<template>
  <div class="w-full" v-if="domains.length > 0">
    <UAccordion :items="domains">
      <template #default="{ item, open }">
        <div
          class="w-full space-y-4 p-2 border-b border-gray-100 dark:border-gray-800 last:border-none"
        >
          <ULink
            :to="`/domains/${item.domain}`"
            class="text-lg font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
          >
            {{ item.domain }}
          </ULink>

          <div
            v-if="open"
            class="w-full flex flex-wrap items-center justify-between gap-4"
          >
            <UBadge
              color="neutral"
              variant="soft"
              size="md"
              icon="i-heroicons-user-circle"
              class="capitalize"
            >
              {{ item.username }}
            </UBadge>

            <div class="flex gap-2">
              <UBadge
                :label="`PTR: ${item.ptr ? 'On' : 'Off'}`"
                :color="item.ptr ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />

              <UBadge
                :label="`DKIM: ${item.dkim ? 'On' : 'Off'}`"
                :color="item.dkim ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />

              <UBadge
                :label="`DMARC: ${item.dmarc ? 'On' : 'Off'}`"
                :color="item.dmarc ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />
            </div>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
  <div v-else class="space-y-4">
    <div v-for="i in skeletonCount" :key="i"  class="space-y-3">
      <!-- line 1 -->
      <USkeleton class="h-4 w-1/3" />
      <!-- line 2 -->
      <div class="w-1/4 grid grid-cols-3 gap-3">
        <USkeleton class="h-4" />
        <USkeleton class="h-4" />
        <USkeleton class="h-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
const skeletonCount = ref(3)
const toast = useToast();

const domains = ref<DomainList>([]);
async function getDomains() {
  try {
    const response = await useApi("/mailcow/domains/khaliq", {
      // TODO: need to query parameter not url path, Khaliq is hardcoded
      // query: { username: "khaliq" },
    });

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
