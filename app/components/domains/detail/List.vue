<!-- components/InboxManager.vue -->
<template>
  <DomainsDetailListHeader
    :selectedMails="value"
    @refresh="getMailInboxs"
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
        class="flex flex-col justify-center gap-2"
      >
        <template #label="{ item }">
          <div class="flex flex-col md:flex-row justify-between w-full gap-2">
            <div class="md:flex-1 font-semibold truncate">
              {{ item.email }}
            </div>

            <div class="grid items-center grid-cols-4 md:grid-cols-5 gap-2">
              <div class="w-10 font-medium text-nowrap">
                {{ item.total_warmup_sent }}
                <span class="text-[10px] uppercase">sent</span>
              </div>

              <div class="w-10 font-bold text-emerald-600">
                {{ item.inbox_percent }}%
              </div>

              <div class="w-10 font-bold text-rose-500">
                {{ item.spam_percent }}%
              </div>

              <div class="w-10">
                <UBadge
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium border',
                    item.warmup_status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200',
                  ]"
                  >{{ item.warmup_status }}</UBadge
                >
              </div>

              <DomainsDetailDrawer :inbox="item" />
            </div>
          </div>
        </template>
      </UCheckboxGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxGroupItem } from "@nuxt/ui";
import type { MailInbox } from "~/types/inbox";
const inboxes = ref<MailInbox[]>([]);

const props = defineProps<{
  domain: string;
}>();

const records = [
  {
    email: "test@gmail.com",
    user_id: "12345",
    total_warmup_sent: 10,
    inbox_percent: 90,
    spam_percent: 10,
    warmup_status: "active",
  },
];

const items = computed<CheckboxGroupItem[]>(() =>
  records.map((record, index) => ({
    id: record.user_id,
    label: record.email,
    value: record,
    ...record,
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

async function getMailInboxs() {
  pending.value = true;

  try {
    const response = await useApi(`/mailcow/mailboxes/${props.domain}`);
    inboxes.value = response as MailInbox[];
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

// onMounted(async () => {
//   await getMailInboxs();
// });
</script>
