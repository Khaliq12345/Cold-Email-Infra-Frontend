<template>
  <div class="p-4 space-y-4">
    <UContainer>
      <UCard>
        <template #header>
          <DomainsDetailHeader :name="slug as string" />
        </template>
        <template #default>
          <DomainsDetailChart />
        </template>
      </UCard>
    </UContainer>
    <UContainer>
      <DomainsDetailList />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params;
console.log("Domain slug:", slug);
</script>

<style></style>
