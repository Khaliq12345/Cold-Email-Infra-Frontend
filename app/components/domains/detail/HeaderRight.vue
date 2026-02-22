<template>
  <div class="flex gap-2">
    <template v-if="domainDetails">
      <!-- Plusvibe Select -->
      <DomainsDetailModalPlusvibeSelect
        :domainDetails="domainDetails"
        :domain="domain"
        :username="appStore.getUsername()"
      ></DomainsDetailModalPlusvibeSelect>

      <UButton color="primary" size="sm">Manage</UButton>
    </template>
    <template v-else>
      <USkeleton class="h-8 w-20 rounded-md" />
      <USkeleton class="h-8 w-20 rounded-md" />
    </template>
  </div>
</template>

<script setup lang="ts">
interface props {
  domainDetails: any;
  domain: string | null;
}

const props = defineProps<props>();
const appStore = useAppStore();
</script>
