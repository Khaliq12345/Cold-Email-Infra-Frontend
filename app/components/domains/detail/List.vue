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

    <!-- Inbox list -->
    <div>
      <div
        v-for="inbox in filteredInboxes"
        :key="inbox.email"
        class="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted/30 border-b last:border-b-0 border-monoc-500"
      >
        <UCheckbox
          :model-value="selected.has(inbox.email)"
          @update:model-value="(value) => toggleInbox(inbox.email)"
        />
        <div class="flex items-start md:items-center gap-2 flex-1 min-w-0">
          <UAvatar icon="i-lucide-user" class="shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-mono">{{ inbox.email }}</p>
            <p class="text-xs text-gray-500">{{ inbox.name }}</p>
          </div>
        </div>
        <UIcon name="i-lucide-ellipsis-vertical" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Inbox {
  email: string;
  name: string;
}

const inboxes = ref<Inbox[]>([
  { email: "n-s@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "n-soto@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "n.s@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "n.soto@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "n_s@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "n_soto@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "nicole-s@adchatprogrammatic.com", name: "Nicole Soto" },
  { email: "nicole-soto@adchatprogrammatic.com", name: "Nicole Soto" },
]);

const searchQuery = ref("");
const selected = ref<Set<string>>(new Set());

const filteredInboxes = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return inboxes.value;
  return inboxes.value.filter(
    (inbox) =>
      inbox.email.toLowerCase().includes(query) ||
      inbox.name.toLowerCase().includes(query),
  );
});

const allSelected = computed(() => {
  const visibleEmails = filteredInboxes.value.map((i) => i.email);
  return (
    visibleEmails.length > 0 &&
    visibleEmails.every((email) => selected.value.has(email))
  );
});

function toggleAll(value: boolean | "indeterminate") {
  if (value === "indeterminate") return;
  const visibleEmails = filteredInboxes.value.map((i) => i.email);
  if (value) {
    visibleEmails.forEach((email) => selected.value.add(email));
  } else {
    visibleEmails.forEach((email) => selected.value.delete(email));
  }
  // Trigger reactivity
  selected.value = new Set(selected.value);
}

function toggleInbox(email: string) {
  if (selected.value.has(email)) {
    selected.value.delete(email);
  } else {
    selected.value.add(email);
  }
  selected.value = new Set(selected.value);
}
</script>
