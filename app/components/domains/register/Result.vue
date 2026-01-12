<template>
  <div v-if="domainStatuses || hasError" class="w-full px-1 text-sm space-y-4">
    <!-- Not available -->
    <div
      v-if="hasError"
      class="p-2 flex gap-2 items-center ring ring-orange-400 rounded-lg mb-5"
    >
      <UIcon name="i-lucide-triangle-alert" :size="40" />
      <p>No domains found</p>
    </div>

    <!-- Available -->
    <div v-if="domainStatuses">
      <h2>Suggested domain names.</h2>
      <p>The following is a list of suggestions that may be available</p>
    </div>
    <!-- List -->
    <div v-if="domainStatuses.length" class="flex flex-col gap-2">
      <div
        v-for="suggestion in domainStatuses"
        :key="suggestion"
        class="p-2 flex items-center justify-between border-b border-b-monoc-500 last:border-b-0"
      >
        <div>
          <p class="font-medium">{{ suggestion.domain }}</p>
          <!-- <p class="text-xs text-gray-500">{{ suggestion.subdomain }}</p> -->
        </div>
        <div class="flex items-center gap-1">
          <div class="text-right">
            <!-- <p class="font-semibold">{{ suggestion.ps }}</p> -->
            <p
              class="text-xs"
              :class="{
                'text-green-600': suggestion.status === 'avail',
                'text-red-600': suggestion.status === 'taken',
                'text-gray-500': suggestion.status === 'checking',
              }"
            >
              {{ suggestion.text || "Checking..." }}
            </p>
          </div>
          <DomainsRegisterDrawer
            :domain="suggestion.domain"
            :disabled="suggestion.status !== 'avail'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomainSearchResult, DomainAvailability } from "~/types/domain";

const props = defineProps<{
  hasError?: boolean;
  errorMessage?: string;
}>();

const searchResults: Ref<DomainSearchResult | null> =
  defineModel("searchResults");

interface DomainStatus {
  domain: string;
  status: "avail" | "taken" | "checking";
  text: string;
}

const domainStatuses = ref<DomainStatus[]>([]);

async function checkDomainStatus(domain: string) {
  // Check if domain already exists in array
  const existingIndex = domainStatuses.value.findIndex(
    (d) => d.domain === domain,
  );

  if (existingIndex !== -1) return; // Already exists, don't check again

  // Add domain with checking status
  domainStatuses.value.push({
    domain,
    status: "checking",
    text: "Checking...",
  });

  const currentIndex = domainStatuses.value.length - 1;

  try {
    const response = (await useApi(
      `/domains/status/${domain}`,
    )) as DomainAvailability;
    console.log(response);

    // Update the domain status
    domainStatuses.value[currentIndex] = {
      domain,
      status: response.status.available ? "avail" : "taken",
      text: response.status.available ? "Available" : "Taken",
    };
    console.log(domainStatuses);
  } catch (error) {
    console.log(error);
    // Update with error status
    domainStatuses.value[currentIndex] = {
      domain,
      status: "taken",
      text: "Error",
    };
  }
}

// Watch when new domains are added
watch(
  () => searchResults.value,
  async (newResults, oldResults) => {
    // Only run if searchResults actually changed and has data
    if (!newResults?.data || newResults === oldResults) return;

    console.log("RESULTS", newResults);

    for (const domain of newResults.data.slice(0, 1)) {
      console.log(domain);
      await checkDomainStatus(domain);
    }
  },
  {
    immediate: false, // Don't run on mount, only when searchResults changes
  },
);
</script>
