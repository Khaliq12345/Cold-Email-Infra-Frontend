<template>
  <div class="w-full">
    <UAccordion :items="domains">
      <template #default="{ item, open }">
        <!-- item.content est maintenant Domain -->
        <div class="w-full space-y-4">
          <ULink
            :to="`/domains/${item.domain}`"
            class="text-lg font-bold divide-x divide-monoc-500">{{ item.domain }}</ULink>
          <div
            v-if="open"
            class="w-full flex items-center justify-between gap-4"
          >
            <p class="text-lg">User: {{ item.username }}</p>
            <p
              class="px-2 py-1 rounded-lg"
              :class="item.ptr ? 'bg-green-700' : 'bg-red-700'"
            >
              PTR: {{ item.ptr ? "On" : "Off" }}
            </p>
            <p
              class="px-2 py-1 rounded-lg"
              :class="item.dkim ? 'bg-green-700' : 'bg-red-700'"
            >
              DKIM: {{ item.dkim ? "On" : "Off" }}
            </p>
            <p
              class="px-2 py-1 rounded-lg"
              :class="item.dmarc ? 'bg-green-700' : 'bg-red-700'"
            >
              DMARK: {{ item.dmarc ? "On" : "Off" }}
            </p>
          </div>
        </div>
        <!-- … -->
      </template>
    </UAccordion>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
const toast = useToast();

const domains = ref<DomainList>([]);
async function getDomains() {
  const { data, error } = await useApi("/mailcow/domains/khaliq", {
    // TODO: need to query parameter not url path, Khaliq is hardcoded
    // query: { username: "khaliq" },
  });
  if (error.value) {
    console.log(error.value);
    toast.add({
      title: "Error",
      description: error.value?.message,
      color: "error",
    });
    return;
  } else {
    domains.value = data.value as DomainList;
    console.log("domains: ", domains.value);
  }
}

onMounted(async () => {
  await getDomains();
});
</script>
