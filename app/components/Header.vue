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
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
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
    label: "Domains",
    to: "/domains",
    icon: "i-lucide-book-open",
    active: route.path.startsWith("/domains"),
  },
  {
    label: "Import",
    icon: "i-lucide-import",
    to: "/domains/import",
    active: route.path.startsWith("/import"),
  },
  {
    label: "Purchase",
    icon: "i-heroicons-credit-card",
    to: "/registrar/register",
    active: route.path.startsWith("/purchase"),
  },
]);

const litem = [
  {
    label: "logout",
    to: "/logout",
    icon: "i-lucide-log-out",
    active: route.path.startsWith("/logout"),
  },
];
const appStore = useAppStore();
function logout() {
  appStore.logout();
}
</script>
