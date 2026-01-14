<template>
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between p-2">
    <h2 class="text-lg font-semibold">Inboxes</h2>
    <div class="flex items-center gap-2">
      <UButton
        v-for="button in buttons"
        :key="button.label"
        :color="button.color"
        :variant="button.variant"
        :icon="button.icon"
        size="sm"
        @click="button.onClick"
      >
        <span :class="button.icon ? 'hidden sm:inline' : 'inline'">
          {{ button.label }}
        </span>
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { startWarmup, stopWarmup, removeMails } from "~/utils/mailboxes";

const props = defineProps({
  selectedMails: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["refresh"]);

const toast = useToast();

// TODO: upadate onClick to pass directly api call using tools
const buttons = [
  {
    label: "Start Warmup ",
    icon: "",
    color: "primary",
    variant: "soft",
    onClick: async () => {
      const { success, response } = await startWarmup(props.selectedMails);
      if (success) {
        toast.add({
          title: "Warmup Started",
          description: "Warmup has been started successfully.",
          color: "success",
        });
      } else {
        toast.add({
          title: "Warmup Failed",
          description: response.message,
          color: "error",
        });
      }
    },
  },
  {
    label: "Stop  Warmup ",
    icon: "",
    color: "error",
    variant: "soft",
    onClick: async () => {
      const { success, response } = await stopWarmup(props.selectedMails);
      if (success) {
        toast.add({
          title: "Warmup Stopped",
          description: "Warmup has been stopped successfully.",
          color: "success",
        });
        emits("refresh");
      } else {
        toast.add({
          title: "Warmup Failed",
          description: response.message,
          color: "error",
        });
      }
    },
  },
  {
    label: "",
    icon: "i-lucide-trash",
    color: "error",
    variant: "outline",
    onClick: async () => {
      const { success, response } = await removeMails(props.selectedMails);
      if (success) {
        toast.add({
          title: "Mailbox Removed",
          description: "Mailbox has been removed successfully.",
          color: "success",
        });
        emits("refresh");
      } else {
        toast.add({
          title: "Mailbox Removal Failed",
          description: response.message,
          color: "error",
        });
      }
    },
  },
];
</script>
