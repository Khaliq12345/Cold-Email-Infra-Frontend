<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div v-if="isValid" class="mt-8 max-w-lg mx-auto p-3">
      <UCard shadow="sm" :ui="{ body: { padding: 'sm:p-6' } }">
        <DomainsImportCheckout :domain="domain"></DomainsImportCheckout>
        <DomainsImportNameServer></DomainsImportNameServer>
      </UCard>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  domain: string | null;
  isValid: boolean; // Corrected spelling from isValide
}>();
</script>
