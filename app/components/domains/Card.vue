<template>
  <UCard class="relative overflow-hidden">
    <template #header>
      <DomainsChartHeader
        :total_domains="totalDomain"
        :total_mailboxes="totalMailboxes"
      />
    </template>

    <!-- <template #default>
      <DomainsChartBody :domainStats="domainStats" :pending="pending" />
    </template> -->
  </UCard>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

const appStore = useAppStore();
const toast = useToast();

const domainStats = ref([]);
const totalDomain = ref(0);
const totalMailboxes = ref(0);
const pending = ref(false);

//load domain stats
async function loadDomainStats() {
  pending.value = true;
  try {
    const response = await useApi(`/domains/stats/${appStore.getUsername()}`, {
      method: "GET",
    });
    console.log(response);
    domainStats.value = response.stats;
    totalDomain.value = response.total_domains;
    totalMailboxes.value = response.total_mailboxes;
  } catch (error) {
    console.error("Error loading domain stats:", error);
    toast.add({
      title: "Error",
      description: "Failed to load domain stats",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}

onMounted(async () => {
  await loadDomainStats();
});
</script>
