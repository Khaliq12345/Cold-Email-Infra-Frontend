<template>
  <UHeader
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full',
    }"
  >
    <template #title>
      <div>EXISTANTLY</div>
    </template>

    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="mx-2.5" />
    </template>

    <template #right>
      <ThemeToggle />
      <UButton
        color="primary"
        variant="ghost"
        icon="i-lucide-log-out"
        @click="logout"
      >
      </UButton>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Domain",
    to: "/domains",
    icon: "i-lucide-book-open",
    active: route.path.startsWith("/domains"),
  },
  {
    label: "Purchase",
    icon: "i-heroicons-credit-card",
    to: "/registrar/register",
    active: route.path.startsWith("/registrar"),
  },
  {
    label: "Import",
    icon: "i-lucide-import",
    to: "/import",
    active: route.path.startsWith("/import"),
  },
]);

const appStore = useAppStore();
function logout() {
  appStore.logout();
  navigateTo("/login");
}
</script>
