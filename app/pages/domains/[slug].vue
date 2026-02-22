<template>
  <div class="space-y-4 pt-5">
    <UContainer>
      <UCard>
        <template #header>
          <DomainsDetailHeader :domain="slug as string" />
        </template>
        <template #default>
          <DomainsDetailChart />
        </template>
      </UCard>
    </UContainer>

    <UContainer>
      <DomainsDetailList :domain="slug as string" />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params;
</script>

<style></style>
