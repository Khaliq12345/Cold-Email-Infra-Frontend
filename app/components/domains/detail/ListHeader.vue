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
const props = defineProps({
  selectedMails: {
    type: Array,
    required: true,
  },
});

// TODO: upadate onClick to pass directly api call using tools
const buttons = [
  {
    label: "Start Warmup ",
    icon: "",
    color: "primary",
    variant: "soft",
    onClick: () => {
      console.log("selected: ", props.selectedMails);
    },
  },
  {
    label: "Stop  Warmup ",
    icon: "",
    color: "error",
    variant: "soft",
    onClick: () => {
      console.log("selected: ", props.selectedMails);
    },
  },
  {
    label: "",
    icon: "i-lucide-trash",
    color: "error",
    variant: "outline",
    onClick: () => {
      console.log("selected: ", props.selectedMails);
    },
  },
];
</script>
