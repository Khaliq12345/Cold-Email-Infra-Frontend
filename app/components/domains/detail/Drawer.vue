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
        <h3 class="text-lg font-bold">{{ domain }}</h3>
        <UButton icon="i-lucide-x" variant="ghost" @click="open = false" />
      </div>
    </template>

    <template #body>
      <p>{{ mailbox.value.id }}</p>
      <!-- TODO: remplace with norman value -->
      <!-- Part 1 info -->
      <div class="grid grid-cols-2 gap-4">
        <p class="font-semibold underline underline-offset-2">Current status</p>
        <p>Active</p>

        <p class="font-semibold underline underline-offset-2">Warmup Status</p>
        <p>Disabled</p>

        <p class="font-semibold underline underline-offset-2">Account</p>
        <p>name</p>
      </div>
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

const open = ref(false);
const activeMailbox = ref(null);
const mailboxStatus = ref(null);

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
    const response = await useApi(
      `/plusvibe/warmup/stats?domain=${props.domain}&start_date=2026-01-15&end_date=2026-01-17&email_acc_id=${props.mailbox.value.id}`,
    );
    console.log(response);
    mailboxStatus.value = response.data;
    console.log(mailboxStatus);
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
