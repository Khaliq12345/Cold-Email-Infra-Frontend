<!-- components/InboxManager.vue -->
<template>
  <DomainsDetailListHeader></DomainsDetailListHeader>

  <div class="border border-monoc-500 rounded-lg shadow-sm">
    <!-- Select all -->
    <div
      class="flex items-center gap-2 px-4 py-3 border-b border-gray-500 bg-muted/30"
    >
      <UCheckbox :model-value="allSelected" @update:model-value="toggleAll" />
      <span class="text-sm font-medium">Select all</span>
    </div>

    <!-- Skeleton loading -->
    <div v-if="pending" class="space-y-2 p-4">
      <USkeleton v-for="i in 5" :key="i" class="h-4 w-full" />
    </div>

    <!-- Inbox list -->
    <div v-else>
      <div
        v-for="inbox in filteredInboxes"
        :key="inbox.username"
        class="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted/30 border-b last:border-b-0 border-monoc-500"
      >
        <UCheckbox
          :model-value="selected.has(inbox.username)"
          @update:model-value="(value) => toggleInbox(inbox.username)"
        />
        <div class="flex items-start md:items-center gap-2 flex-1 min-w-0">
          <UAvatar icon="i-lucide-user" class="shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-mono">{{ inbox.username }}</p>
            <p class="text-xs text-gray-500">{{ inbox.name }}</p>
          </div>
        </div>
        <UIcon name="i-lucide-ellipsis-vertical" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MailInbox } from "~/types/inbox";
const props = defineProps({
  domain: {
    type: String,
    required: true,
  },
});

const inboxes = ref<MailInbox[]>([]);
const pending = ref(false);

const searchQuery = ref("");
const selected = ref<Set<string>>(new Set());

const filteredInboxes = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return inboxes.value;
  return inboxes.value.filter(
    (inbox) =>
      inbox.username.toLowerCase().includes(query) ||
      inbox.name.toLowerCase().includes(query)
  );
});

const allSelected = computed(() => {
  const visibleEmails = filteredInboxes.value.map((i) => i.username);
  return (
    visibleEmails.length > 0 &&
    visibleEmails.every((email) => selected.value.has(email))
  );
});

function toggleAll(value: boolean | "indeterminate") {
  if (value === "indeterminate") return;
  const visibleEmails = filteredInboxes.value.map((i) => i.username);
  if (value) {
    visibleEmails.forEach((username) => selected.value.add(username));
  } else {
    visibleEmails.forEach((username) => selected.value.delete(username));
  }
  // Trigger reactivity
  selected.value = new Set(selected.value);
}

function toggleInbox(username: string) {
  if (selected.value.has(username)) {
    selected.value.delete(username);
  } else {
    selected.value.add(username);
  }
  selected.value = new Set(selected.value);
}

async function getMailInboxs() {
  pending.value = true;
  
  try {
    const response = await useApi(`/mailcow/mailboxes/${props.domain}`);
    inboxes.value = response as MailInbox[];
  } catch (error) {
    console.error('Error fetching mailboxes:', error);
  } finally {
    pending.value = false;
  }
}
onMounted(async () => {
  await getMailInboxs();
});
</script>