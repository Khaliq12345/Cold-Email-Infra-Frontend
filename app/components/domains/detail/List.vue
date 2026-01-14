<!-- components/InboxManager.vue -->
<template>
  <DomainsDetailListHeader :selectedMails="value"></DomainsDetailListHeader>

  <div class="mt-2 p-2 border-t">
    <!-- Select all -->
    <!-- <div
      class="md:flex md:items-center md:justify-between gap-2 px-4 py-2 border-b border-gray-500 bg-muted/30 space-y-2 md:space-y-0"
    >
      <UButton
        :ui="{ label: 'hidden sm:block ' }"
        @click="toggleAll"
        size="sm"
        >{{
          value.length === items.length ? "Deselect all" : "Select all"
        }}</UButton
      >
    </div> -->

    <!-- Skeleton loading -->
    <div v-if="pending" class="space-y-2 p-4">
      <USkeleton v-for="i in 5" :key="i" class="h-4 w-full" />
    </div>
    <!-- Inbox list -->
    <div v-else class="p-2 grid items-center grid-cols-1">
      <DomainsDetailDrawer />
      <UCheckboxGroup
        v-model="value"
        value-key="id"
        :items="items"
        class="flex flex-col gap-2"
      >
        <template #label="{ item }">
          <div class="w-full">
            <!-- Ligne principale -->
            <div class="flex items-center justify-between">
              <div class="font-medium text-base">
                {{ item.name }}
              </div>
              <!-- Bouton info -->
              <DomainsDetailDrawer />
            </div>

            <!-- Ligne secondaire avec les données -->
            <div class="flex items-center text-sm text-gray-600 mt-1 px-2">
              <!-- champ quota -->
              <div class="w-24 text-right">
                {{ item.quota }}
              </div>
              <!-- champ mboxes_left -->
              <div class="w-24 text-right">
                {{ item.mboxes_left }}
              </div>
              <!-- champ percent_in_use -->
              <div class="w-24 text-right">
                {{ item.percent_in_use }}
              </div>
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

const items = computed<CheckboxGroupItem[]>(() =>
  inboxes.value.map((inbox, index) => ({
    id: index,
    label: inbox.username,
    ...inbox,
  })),
);

const emits = defineEmits(["selected"]);

const value = defineModel<number[]>({ default: () => [] });

const pending = ref(false);

const toast = useToast();

async function toggleAll() {
  if (value.value.length === items.value.length) {
    value.value = [];
  } else {
    value.value = items.value.map((item) => item.id);
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
onMounted(async () => {
  await getMailInboxs();
});
</script>
