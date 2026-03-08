<template>
  <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
    <template #header>
      <DomainsListHeader
        @refresh="getDomains"
        @filter="
          (payload) => {
            Object.assign(filters, payload);
            page = 1;
          }
        "
      />
    </template>

    <template #default>
      <div v-if="pending" class="space-y-2 p-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center space-x-4 py-3 border-b border-gray-100 dark:border-gray-800"
        >
          <USkeleton class="h-4 w-4" />
          <div class="space-y-2 flex-1">
            <USkeleton class="h-4 w-250px]" />
            <USkeleton class="h-3 w-150px]" />
          </div>
          <USkeleton class="h-8 w-24" />
        </div>
      </div>

      <DomainsListBody
        v-else
        v-model:domains="domains"
        v-model:page="page"
        v-model:limit="limit"
        v-model:total-domains="totalDomains"
      />
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const selectedDomains = ref([]);
const page = ref(1);
const limit = ref(20);
const totalDomains = ref(0);
const pending = ref(false);

const filters = reactive({
  domain: "",
  minMailboxes: null as number | null,
  hasPlusvibe: undefined as boolean | undefined,
  order: "desc" as "asc" | "desc" | undefined, // Changed to string for clearer API sorting
});

provide("selectedDomains", selectedDomains);

const toast = useToast();
const domains = ref<DomainList>([]);

// Loading all domains
async function getDomains() {
  pending.value = true;
  try {
    const response = await useApi(`domains`, {
      query: {
        page: page.value,
        limit: limit.value,
        domain: filters.domain || undefined,
        minMailboxes: filters.minMailboxes || undefined,
        hasPlusvibe: filters.hasPlusvibe,
        order: filters.order,
      },
    });

    if (response) {
      domains.value = (response.data || response) as DomainList;
      totalDomains.value = response.total || domains.value.length;
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: "An error occurred when getting domains",
      color: "red",
    });
  } finally {
    pending.value = false;
  }
}

// 1. Watch for changes in page, limit, OR filters to refetch data
// We use a getter function for filters to watch the whole reactive object deeply
watch(
  [page, limit, () => ({ ...filters })],
  () => {
    // Reset to page 1 when filters change (optional but recommended)
    // if (page.value !== 1) page.value = 1;
    getDomains();
  },
  { deep: true },
);

onMounted(() => {
  getDomains();
});
</script>
