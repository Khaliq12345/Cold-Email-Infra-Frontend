<!-- components/InboxManager.vue -->
<template>
  <DomainsDetailListHeader
    :selectedMails="value"
    @refresh="getMailboxes"
    @selectall="toggleAll"
    :toggle="value.length === items.length"
  ></DomainsDetailListHeader>

  <div class="mt-2 p-2 border-t">
    <!-- Skeleton loading -->
    <div v-if="pending" class="space-y-2 p-4">
      <USkeleton v-for="i in 5" :key="i" class="h-4 w-full" />
    </div>
    <!-- Inbox list -->
    <div v-else class="p-2 grid items-center grid-cols-1">
      <UCheckboxGroup
        v-model="value"
        value-key="value"
        :items="items"
        class="flex flex-col gap-1"
        variant="card"
        :ui="{ label: 'w-full' }"
      >
        <template #label="{ item }">
          <div
            class="flex flex-col md:grid md:grid-cols-2 items-start w-full gap-6"
          >
            <p class="text-sm font-medium truncate leading-none">
              {{ item.email }}
            </p>

            <div class="flex items-center justify-end gap-2 min-w-80px">
              <span
                class="h-2 w-2 rounded-full"
                :class="
                  item.warmup_status === 'ACTIVE'
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                    : 'bg-gray-500'
                "
              ></span>
              <span
                class="text-[10px] uppercase tracking-widest font-bold text-gray-400"
              >
                {{ item.warmup_status }}
              </span>

              <DomainsDetailDrawer :mailbox="item" :domain="domain" />
            </div>
          </div>
        </template>
      </UCheckboxGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";

const mailboxes = ref([]);

const props = defineProps<{
  domain: string;
}>();

const items = computed<CheckboxGroupItem[]>(() =>
  mailboxes.value.map((mailbox, index) => ({
    id: mailbox.id,
    label: mailbox.email,
    value: mailbox,
    ...mailbox,
  })),
);
const value = ref([]);

const pending = ref(false);

const toast = useToast();

async function toggleAll() {
  if (value.value.length === items.value.length) {
    value.value = [];
  } else {
    value.value = items.value.map((item) => item.value);
  }
}

async function getMailboxes() {
  pending.value = true;
  try {
    const response = await useApi(`/plusvibe/mailboxes/${props.domain}`);
    mailboxes.value = response.data;
  } catch (error) {
    console.error("Error fetching mailboxes:", error);
    toast.add({
      title: "Error",
      description: "Failed to fetch mailboxes",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}

onMounted(async () => {
  await getMailboxes();
});
</script>
