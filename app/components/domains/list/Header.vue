<template>
  <div class="w-full flex items-center justify-between gap-2 py-4">
    <h2 class="text-lg font-bold truncate">Domains</h2>

    <div class="flex items-center gap-1.5 shrink-0">
      <UButton
        to="/domains/import"
        variant="ghost"
        color="gray"
        icon="i-lucide-import"
        class="sm:hidden"
      />
      <UButton
        to="/domains/import"
        variant="outline"
        color="gray"
        icon="i-lucide-import"
        label="Import"
        class="hidden sm:flex"
      />

      <UButton
        to="/registrar/register"
        target="_blank"
        color="black"
        icon="i-heroicons-credit-card"
        class="sm:hidden"
      />
      <UButton
        to="/registrar/register"
        target="_blank"
        color="black"
        label="Purchase"
        icon="i-heroicons-credit-card"
        class="hidden sm:flex"
      />
      <UButton
        variant="ghost"
        color="gray"
        icon="i-heroicons-arrow-path"
        size="md"
        class="rounded-full px-4"
        @click="emit('refresh')"
      />

      <UModal
        :ui="{
          width: 'w-full sm:max-w-lg md:max-w-xl', // Responsive width constraints
          container: 'flex items-center justify-center p-4', // Centers on mobile with padding
        }"
      >
        <UButton
          icon="i-heroicons-server-stack"
          label="NS Setup"
          color="gray"
          variant="outline"
          class="w-full md:w-auto justify-center md:justify-start"
        />

        <template #content>
          <div class="p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
            <div class="mb-4 md:mb-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                Configuration Instructions
              </h3>
            </div>

            <NameServer />
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["refresh"]);
</script>
