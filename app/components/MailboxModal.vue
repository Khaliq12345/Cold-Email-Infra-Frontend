<template>
  <UModal
    :open="open"
    @update:open="$emit('update:open', $event)"
    title="Add Mailboxes"
    description="Create new mailboxes for your domain"
  >
    <template #content>
      <div class="p-6">
        <p class="mb-4">Current total: {{ totalMailboxes }}</p>
        <div class="space-y-4">
          <UFormField label="First Name" required>
            <UInput
              v-model="firstName"
              placeholder="Enter first name"
              class="w-full"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField label="Last Name" required>
            <UInput
              v-model="lastName"
              placeholder="Enter last name"
              class="w-full"
              :disabled="isLoading"
            />
          </UFormField>
          <UFormField
            label="Number of Mailboxes"
            help="Specify number of mailboxes to add"
            required
          >
            <UInputNumber
              v-model="mailboxesNumber"
              class="w-full"
              :max="100 - totalMailboxes"
              :min="1"
              :disabled="isLoading"
            />
          </UFormField>
          <UButton
            @click="handleAddMailboxes"
            block
            :disabled="isLoading"
            :loading="isLoading"
          >
            {{ isLoading ? "Adding..." : "Add mailboxes" }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  totalMailboxes: number;
  domains: string[];
}>();

const emit = defineEmits(["refresh", "update:open"]);

const firstName = ref("");
const lastName = ref("");
const mailboxesNumber = ref(1);
const isLoading = ref(false);
const toast = useToast();

const handleAddMailboxes = async () => {
  isLoading.value = true;
  try {
    const response = await useApi(`/mailboxes/create`, {
      method: "POST",
      body: {
        domains: props.domains,
        firstName: firstName.value,
        lastName: lastName.value,
        total: mailboxesNumber.value,
      },
    });

    emit("update:open", false);

    // Reset form
    firstName.value = "";
    lastName.value = "";
    mailboxesNumber.value = 1;
    toast.add({
      title: "Mailboxes creation started",
      color: "success",
    });
    emit("refresh");
  } catch (error) {
    console.error("Failed to add mailboxes:", error);
    toast.add({
      title: "Error",
      description: `Failed to add mailboxes: ${error}`,
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
