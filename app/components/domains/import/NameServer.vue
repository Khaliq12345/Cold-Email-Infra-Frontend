<template>
  <div class="space-y-4">
    <UAlert
      icon="i-heroicons-information-circle"
      color="primary"
      variant="soft"
      title="Action Required"
      description="To connect your domain, log in to your domain registrar and replace your current nameservers with the ones below."
    />

    <div class="space-y-2">
      <div
        v-for="ns in NAMESERVERS"
        :key="ns"
        class="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-3 min-w-0">
          <UIcon
            name="i-heroicons-server"
            class="w-4 h-4 text-gray-400 shrink-0"
          />
          <code
            class="text-sm font-mono truncate text-gray-700 dark:text-gray-300"
          >
            {{ ns }}
          </code>
        </div>

        <UButton
          icon="i-heroicons-clipboard-document"
          color="gray"
          variant="ghost"
          label="Copy"
          @click="copy(ns)"
        />
      </div>
    </div>

    <p class="text-xs text-gray-500 italic">
      Note: DNS changes can take up to 24-48 hours to propagate worldwide.
    </p>
  </div>
</template>

<script setup lang="ts">
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
