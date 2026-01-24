<template>
  <DomainsDetailListHeader
    :selectedMails="value"
    @refresh="getMailboxes"
    @selectall="toggleAll"
    :toggle="value.length === items.length"
    :domain="domain"
    :total-mailboxes="items.length"
  ></DomainsDetailListHeader>

  <div class="mt-2 border-t">
    <div v-if="pending" class="space-y-2 p-4">
      <USkeleton v-for="i in 5" :key="i" class="h-4 w-full" />
    </div>

    <div class="mt-2 mb-2" v-else>
      <UCheckboxGroup
        v-model="value"
        value-key="value"
        :items="items"
        class="flex flex-col gap-1"
        variant="card"
        :ui="{ label: 'w-full' }"
      >
        <template #label="{ item }">
          <DomainsDetailListRow :item="{ item }"></DomainsDetailListRow>
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
    const response = await useApi(`/mailboxes/${props.domain}`);
    mailboxes.value = response;
    console.log(mailboxes.value);
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
