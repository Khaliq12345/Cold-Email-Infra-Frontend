<template>
  <!-- Important Banner, to tell the user to set their plusvibe workspace -->
  <template v-if="domainDetails">
    <UBanner
      color="warning"
      icon="i-lucide-info"
      title="Plusvibe Workspace is not set, kindly set it up with the <<Link Plusvibe>> Button below"
      v-if="!domainDetails.plusvibe_workspace"
    />
  </template>

  <div>
    <!-- Header Sections -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
    >
      <!-- Left section with title and icon -->
      <DomainsDetailHeaderLeft
        :domain-details="domainDetails"
      ></DomainsDetailHeaderLeft>

      <!-- Right section with action buttons -->
      <DomainsDetailHeaderRight
        :domain-details="domainDetails"
        :domain="domain"
      ></DomainsDetailHeaderRight>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-4 gap-2 p-2">
      <template v-if="domainDetails">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ stat.label }}
          </p>
          <p class="font-medium text-sm">{{ stat.value }}</p>
        </div>
      </template>
      <template v-else>
        <div v-for="i in 4" :key="i" class="text-center space-y-1">
          <USkeleton class="h-4 w-16 mx-auto" />
          <USkeleton class="h-5 w-12 mx-auto" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomainInfo } from "~/types/domain";
import type { SelectItem } from "@nuxt/ui";

interface props {
  domain: string | null;
}

const props = defineProps<props>();
const domainDetails = ref();
const isOpen = ref(true);
const toast = useToast();

const stats = computed(() => [
  {
    label: "Status",
    value: domainDetails.paid ? "Active" : "Inactive",
  },
  {
    label: "Mailboxes Left",
    value: "100",
  },
  {
    label: "Created",
    value: formatDate(domainDetails?.created),
  },
]);

function formatDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString();
}

// Get Domain Details
async function getDomainDetails() {
  try {
    const response = await useApi(`domains/${props.domain}`, {
      method: "GET",
    });
    domainDetails.value = response;
  } catch (error) {
    console.error("Error loading domain details:", error);
    toast.add({
      title: "Error",
      description: "Failed to load domain details",
      color: "error",
    });
  }
}

onMounted(async () => {
  await getDomainDetails();
});
</script>
