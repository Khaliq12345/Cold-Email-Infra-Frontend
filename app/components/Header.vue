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
    label: "logout",
    to: "/logout",
    icon: "i-lucide-log-out",
    active: route.path.startsWith("/logout"),
  },
]);
</script>
