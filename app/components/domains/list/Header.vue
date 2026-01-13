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
      />
    </div>
  </div>
</template>
