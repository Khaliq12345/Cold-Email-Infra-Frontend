<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      variant="ghost"
      size="sm"
      @click="toggleColorMode"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>
