<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div v-if="isValid" class="mt-8 max-w-lg mx-auto p-3">
      <UCard shadow="sm" :ui="{ body: { padding: 'sm:p-6' } }">
        <div class="flex items-center gap-3 mb-6">
          <UIcon
            name="i-heroicons-check-circle"
            class="w-6 h-6 text-green-600 dark:text-green-400"
          />
          <div>
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">
              Domain available
            </h2>
            <p class="text-sm text-gray-500 font-mono">{{ domain }}</p>
          </div>
        </div>

        <UButton
          to="/payment-page"
          label="Proceed to Payment"
          icon="i-heroicons-credit-card"
          size="xl"
          block
          class="mb-8 shadow-sm"
        />

        <div class="border-t border-gray-100 dark:border-gray-800 pt-6">
          <div
            class="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <UIcon
              name="i-heroicons-server-stack"
              class="w-4 h-4 text-gray-400"
            />
            Required Nameservers
          </div>

          <div class="space-y-2">
            <div
              v-for="ns in NAMESERVERS"
              :key="ns"
              class="group flex items-center justify-between p-2.5 rounded-md bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-colors"
            >
              <code
                class="text-xs sm:text-sm font-mono text-gray-600 dark:text-gray-400"
              >
                {{ ns }}
              </code>
              <UButton
                icon="i-heroicons-document-duplicate"
                color="gray"
                variant="ghost"
                size="xs"
                @click="copy(ns)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  domain: string | null;
  isValid: boolean; // Corrected spelling from isValide
}>();

const NAMESERVERS = [
  "hydrogen.ns.hetzner.com",
  "oxygen.ns.hetzner.com",
  "helium.ns.hetzner.de",
];

// Simple helper for clipboard
const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  // Optional: use a toast notification here
  useToast().add({ title: "Copied to clipboard" });
};
</script>
