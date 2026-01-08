<template>
  <div class="mx-4 w-full p-2 text-sm space-y-4">
    <!-- Not available -->
    <div class="p-2   flex gap-2 items-center ring ring-orange-400 rounded-lg">
      <UIcon name="i-lucide-triangle-alert" :size="40"/>
      <div>
        <h3><strong>Exemple.com</strong> is not available</h3>
        <p>Exemple.com connot be registered yet.</p>
      </div>
    </div>
    <!-- Text -->
     <div>
      <h2>Suggested domain names.</h2>
      <p>The following is a list of suggestions that may be available</p>
     </div>
     <!-- List -->
      <div class="flex flex-col gap-2">
        <div v-for="domain in suggestedDomains" class="p-2 flex items-center justify-between border-b border-b-monoc-500 last:border-b-0">
          <p>{{ domain.name }}</p>
          <div class="grid gap-2 grid-cols-2">
            <div class="text-right">
              <p>${{ domain.prices }}</p>
              <p class="text-xs text-left">Renews at ${{ domain.prices }}</p>
            </div>
            <UButton variant="outline">Confirm</UButton>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
interface SuggestedDomain {
  name: string;
  available: boolean;
  prices: number;
}
const suggestedDomains = ref<SuggestedDomain[]>([
  { name: "example.net", available: true, prices: 12.99 },
  { name: "example.org", available: false, prices: 10.99 },
  { name: "example.co", available: true, prices: 14.99 },

  { name: "example.com", available: true, prices: 15.99 },
  { name: "example.io", available: true, prices: 29.99 },
  { name: "example.dev", available: false, prices: 19.99 },
  { name: "example.app", available: true, prices: 18.99 },
  { name: "example.tech", available: true, prices: 21.99 },
  { name: "example.shop", available: false, prices: 9.99 },
  { name: "example.xyz", available: true, prices: 1.99 },
  { name: "example.online", available: true, prices: 3.99 },
  { name: "example.site", available: false, prices: 4.99 },
  { name: "example.fr", available: true, prices: 8.99 },
]);

</script>

<style>

</style>