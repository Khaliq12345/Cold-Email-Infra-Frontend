<template>
  <div v-if="searchResult || hasError" class="w-full px-1 text-sm space-y-4">
    <!-- Not available -->
    <div
      v-if="hasError"
      class="p-2 flex gap-2 items-center ring ring-orange-400 rounded-lg mb-5"
    >
      <UIcon name="i-lucide-triangle-alert" :size="40" />
      <p>No domains found</p>
    </div>

    <!-- Text -->
    <div v-if="searchResult?.data.length">
      <h2>Suggested domain names.</h2>
      <p>The following is a list of suggestions that may be available</p>
    </div>

    <!-- List -->
    <div v-if="searchResult?.data.length" class="flex flex-col gap-2">
      <div
        v-for="suggestion in searchResult.data"
        :key="suggestion.domain"
        class="p-2 flex items-center justify-between border-b border-b-monoc-500 last:border-b-0"
      >
        <div>
          <p class="font-medium">{{ suggestion.domain }}</p>
          <p class="text-xs text-gray-500">{{ suggestion.subdomain }}</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="text-right">
            <p class="font-semibold">{{ suggestion.ps }}</p>
            <p
              class="text-xs"
              :class="{
                'text-green-600':
                  domainStatusesComputed[suggestion.domain]?.status === 'avail',
                'text-red-600':
                  domainStatusesComputed[suggestion.domain]?.status === 'taken',
                'text-gray-500':
                  domainStatusesComputed[suggestion.domain]?.status ===
                  'checking',
              }"
            >
              {{ domainStatusesComputed[suggestion.domain]?.text }}
            </p>
          </div>
          <DomainsRegisterDrawer
            :domain="suggestion.domain"
            :disabled="
              domainStatusesComputed[suggestion.domain]?.status !== 'avail'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DomainSearchResult, DomainAvailability } from "~/types/domain";

const props = defineProps<{
  searchResult?: DomainSearchResult | null;
  hasError?: boolean;
  errorMessage?: string;
}>();

const domainStatuses = ref<
  Record<string, { status: "avail" | "taken" | "checking"; text: string }>
>({});

const domainStatusesComputed = computed(() => {
  const statuses: Record<
    string,
    { status: "avail" | "taken" | "checking"; text: string }
  > = {};

  if (props.searchResult?.data) {
    props.searchResult.data.forEach((suggestion) => {
      const domain = suggestion.domain;
      const cached = domainStatuses.value[domain];
      const status = cached?.status || "checking";
      const text =
        status === "checking"
          ? "Checking..."
          : status === "avail"
          ? "Available"
          : "Taken";

      statuses[domain] = { status, text };
    });
  }

  return statuses;
});

async function checkDomainStatus(domain: string) {
  if (domainStatuses.value[domain]) return;

  domainStatuses.value[domain] = { status: "checking", text: "Checking..." };

  try {
    const response = (await useApi(
      `/domains/status/${domain}`
    )) as DomainAvailability;
    domainStatuses.value[domain] = {
      status: response.status.status,
      text: response.status.status === "avail" ? "Available" : "Taken",
    };
  } catch (error) {
    console.log(error);
    domainStatuses.value[domain] = { status: "taken", text: "Error" };
  }
}

watch(
  () => props.searchResult?.data,
  (newData) => {
    if (newData) {
      newData.forEach((suggestion) => {
        checkDomainStatus(suggestion.domain);
      });
    }
  },
  { immediate: true }
);
</script>
