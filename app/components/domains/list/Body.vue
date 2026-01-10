<template>
  <div class="w-full">
    <UAccordion :items="domains">
      <template #default="{ item, open }">
        <div
          class="w-full space-y-4 p-4 border-b border-gray-100 dark:border-gray-800"
        >
          <ULink
            :to="`/domains/${item.domain}`"
            class="text-lg font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
          >
            {{ item.domain }}
          </ULink>

          <div
            v-if="open"
            class="w-full flex flex-wrap items-center justify-between gap-4"
          >
            <UBadge
              color="neutral"
              variant="soft"
              size="md"
              icon="i-heroicons-user-circle"
              class="capitalize"
            >
              {{ item.username }}
            </UBadge>

            <div class="flex gap-2">
              <UBadge
                :label="`PTR: ${item.ptr ? 'On' : 'Off'}`"
                :color="item.ptr ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />

              <UBadge
                :label="`DKIM: ${item.dkim ? 'On' : 'Off'}`"
                :color="item.dkim ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />

              <UBadge
                :label="`DMARC: ${item.dmarc ? 'On' : 'Off'}`"
                :color="item.dmarc ? 'success' : 'error'"
                variant="subtle"
                size="md"
              />
            </div>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
const toast = useToast();

const domains = ref<DomainList>([]);
async function getDomains() {
  try {
    const response = await useApi("/mailcow/domains/khaliq", {
      // TODO: need to query parameter not url path, Khaliq is hardcoded
      // query: { username: "khaliq" },
    });

    domains.value = response as DomainList;
    console.log("domains: ", domains.value);
  } catch (error) {
    toast.add({
      title: "Error",
      description: error,
      color: "error",
    });
  }
}

onMounted(async () => {
  await getDomains();
});
</script>
