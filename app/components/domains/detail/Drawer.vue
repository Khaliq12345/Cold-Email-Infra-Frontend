<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    :ui="{ content: 'w-screen h-screen md:max-w-md' }"
    title="Mailbox Details"
    description="Show Mailbox Details"
  >
    <template #default>
      <UBadge
        variant="soft"
        color="primary"
        class="gap-2"
        @click="getMailboxWarmpUpStatus"
      >
        Details
      </UBadge>
    </template>

    <!-- HEADER -->
    <template #header>
      <div class="flex justify-between items-center border-b border-gray-200">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-bold">{{ domain }}</h3>
          <UBadge
            :color="mailbox.status === 'ACTIVE' ? 'success' : 'error'"
            size="md"
            variant="soft"
          >
            {{ mailbox.status === "ACTIVE" ? "Active" : "Inactive" }}
          </UBadge>
        </div>
        <UButton icon="i-lucide-x" variant="ghost" @click="open = false" />
      </div>
    </template>

    <template #body>
      <div class="flex justify-between items-center">
        <h2>Name:</h2>
        <p>
          {{ props.mailbox.payload.name.last_name }}
          {{ props.mailbox.payload.name.first_name }}
        </p>
      </div>

      <DomainsDetailDrawerWarmup :data="mailbox.payload.warmup" class="mb-2" />
      <DomainsDetailDrawerAnalytics
        :data="mailbox.payload.analytics"
        class="mb-4"
      />
      <DomainsDetailDrawerChart :data="mailboxStatus?.emailAcc?.chart_data" />
    </template>

    <template #footer>
      <!-- Part 2 buttons -->
      <div class="p-2 grid grid-cols-3 gap-2">
        <UButton color="primary" @click="startWarmup" size="sm"
          >Start Warmup</UButton
        >

        <UButton color="error" variant="soft" @click="stopWarmup" size="sm"
          >Stop Warmup</UButton
        >

        <UButton color="error" variant="soft" @click="deleteInbox" size="sm"
          >Delete</UButton
        >
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
const props = defineProps({
  mailbox: {
    type: Object,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

const toast = useToast();
const open = ref(false);
const activeMailbox = ref(null);
const mailboxStatus = ref({});

function showInfo(item) {
  activeMailbox.value = item;
  open.value = true;
}

function startWarmup() {
  console.log("Start warmup:", activeMailbox.value);
  // ici tu peux appeler ton API ou autre logique
}

function stopWarmup() {
  console.log("Stop warmup:", activeMailbox.value);
  // ici tu peux appeler ton API ou autre logique
}

function deleteInbox() {
  console.log("Delete inbox:", activeMailbox.value);
  // ici tu peux confirmer la suppression puis appeler l’API
}

const pending = ref(false);

async function getMailboxWarmpUpStatus() {
  pending.value = true;
  try {
    const response = await useApi("/plusvibe/warmup/stats", {
      params: {
        domain: props.domain,
        start_date: "2026-01-15",
        end_date: "2026-01-17",
        email_acc_id: props.mailbox.id,
      },
    });
    mailboxStatus.value = response.data;
    console.log("mailboxStatus:", mailboxStatus.value);
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
</script>
