<template>
  <div class="p-4 space-y-4">
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
      <DomainsDetailList />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
})

import type { DomainInfo } from "~/types/domain";
const { slug } = useRoute().params;

const toast = useToast();
const domain = ref<DomainInfo | null>(null);

async function getDomain() {
  const { data, error } = await useApi(`/mailcow/domain/${slug}`, {
    // query: {
    //   domain: slug,
    // },
  });
  if (error.value) {
    toast.add({
      title: "Error",
      description: error.value?.message,
      color: "error",
    });
    return;
  } else {
    domain.value = data.value as DomainInfo;
  }
}
onMounted(async () => {
  await getDomain();
})
</script>

<style></style>
