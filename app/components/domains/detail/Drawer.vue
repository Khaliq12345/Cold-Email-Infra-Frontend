<template>
  <UDrawer
    v-model:open="open"
    direction="right"
    :handle="false"
    :ui="{ content: 'w-screen h-screen md:max-w-md' }"
  >
    <template #default>
      <UButton label="Open" color="neutral" variant="soft" />
    </template>

    <!-- HEADER -->
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">Inbox Details</h3>
        <UButton icon="i-lucide-x" variant="ghost" @click="open = false" />
      </div>
    </template>

    <template #body>
      // TODO: remplace with norman value
      <div class="p-4 space-y-6">
        <section class="space-y-2">
          <h4 class="font-semibold text-md border-b pb-1">INFO BASIC</h4>
          <div><strong>Status:</strong> {{ activeInbox?.status }}</div>
          <div><strong>Warmup:</strong> {{ activeInbox?.status_warmup }}</div>
          <div><strong>Account:</strong> {{ activeInbox?.account }}</div>
        </section>
      </div>
    </template>

    <template #footer>
      // TODO: Add footer content here
      <div class="p-4 border-t flex justify-end gap-2">
        <!-- Bouton START (si status_warmup false) -->
        <UButton
          v-if="activeInbox && !activeInbox.status_warmup"
          color="primary"
          @click="startWarmup"
        >
          Start
        </UButton>

        <!-- Bouton STOP (si status_warmup true) -->
        <UButton
          v-if="activeInbox && activeInbox.status_warmup"
          color="warning"
          @click="stopWarmup"
        >
          Stop
        </UButton>

        <!-- Bouton DELETE (si status_warmup false) -->
        <UButton
          v-if="activeInbox && !activeInbox.status_warmup"
          color="error"
          @click="deleteInbox"
        >
          Delete
        </UButton>
      </div>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
