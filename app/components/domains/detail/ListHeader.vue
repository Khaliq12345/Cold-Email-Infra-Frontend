<template>
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between p-2">
    <h2 class="text-lg font-semibold">Inboxes</h2>
    <div class="flex items-center gap-2">
      <USwitch
        @change="$emit('selectall')"
        :label="toggle ? 'Deselect all' : 'Select all'"
      />
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

    <UModal
      v-model:open="dialogState"
      title="Number of Mailboxes"
      description="Total number of mailboxes to add"
    >
      <template #content>
        <p>{{ totalMailboxes }}</p>
        <div class="p-5 flex flex-col justify-center">
          <UFormField
            label="Mailboxes Number"
            help="Specify number of mailboxes to add"
            required
            class="mb-5"
          >
            <UInputNumber
              v-model="mailboxesNumber"
              class="w-full"
              :max="100 - totalMailboxes"
            />
          </UFormField>
          <UButton
            @click="
              () => {
                addMailboxes(mailboxesNumber, domain);
                dialogState = false;
              }
            "
            block
            >Add mailboxes</UButton
          >
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedMails: {
    type: Array,
    required: true,
  },
  toggle: {
    type: Boolean,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  totalMailboxes: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["refresh", "selectall"]);

const toast = useToast();
const dialogState = ref(false);
const mailboxesNumber = ref(0);

// TODO: upadate onClick to pass directly api call using tools
const buttons = [
  {
    label: "Add mailboxes",
    icon: "i-lucide-play",
    color: "primary",
    variant: "soft",
    onClick: async () => {
      dialogState.value = true;
    },
  },
  {
    label: "",
    icon: "i-lucide-trash",
    color: "error",
    variant: "outline",
    onClick: async () => {
      console.log(props.selectedMails);
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
