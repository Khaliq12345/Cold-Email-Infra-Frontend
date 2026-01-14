<template>
  <div class="space-y-4">
    <UContainer>
      <UCard>
        <template #header>
          <DomainsDetailHeader :name="slug as string" :domain-info="domain" />
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
definePageMeta({});

import type { DomainInfo } from "~/types/domain";
const { slug } = useRoute().params;

const toast = useToast();
const domain = ref<DomainInfo | null>(null);

async function getDomain() {
  try {
    console.log(slug);
    const response = await useApi(`/mailcow/domain/${slug}`, {});
    domain.value = response as DomainInfo;
  } catch (error) {
    toast.add({
      title: "Error",
      description: error as string,
      color: "error",
    });
  }
}
onMounted(async () => {
  await getDomain();
});
</script>

<style></style>
