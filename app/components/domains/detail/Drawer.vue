<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    :ui="{ content: 'w-screen h-screen md:max-w-md' }"
  >
    <template #default>
      <UButton label="Details" color="neutral" variant="soft" />
    </template>

    <!-- HEADER -->
    <template #header>
      <div class="flex justify-between items-center border-b border-gray-200">
        <h3 class="text-lg font-bold">{{ props.inbox.domain }}</h3>
        <UButton icon="i-lucide-x" variant="ghost" @click="open = false" />
      </div>
    </template>

    <template #body>
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
import { ref } from "vue";
const props = defineProps({
  inbox: {
    type: Object,
    required: true,
  },
});

const open = ref(false);
const activeInbox = ref(null);

function showInfo(item) {
  activeInbox.value = item;
  open.value = true;
}

function startWarmup() {
  console.log("Start warmup:", activeInbox.value);
  // ici tu peux appeler ton API ou autre logique
}

function stopWarmup() {
  console.log("Stop warmup:", activeInbox.value);
  // ici tu peux appeler ton API ou autre logique
}

function deleteInbox() {
  console.log("Delete inbox:", activeInbox.value);
  // ici tu peux confirmer la suppression puis appeler l’API
}
</script>
