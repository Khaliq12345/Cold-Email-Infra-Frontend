<template>
  <div class="flex items-center gap-3 mb-6">
    <UIcon
      name="i-heroicons-check-circle"
      class="w-6 h-6 text-green-600 dark:text-green-400"
    />
    <div>
      <h2 class="text-base font-semibold text-gray-900 dark:text-white">
        Domain(s) available
      </h2>
      <p class="text-sm text-gray-500 font-mono">
        {{ domains.join(", ") }}
      </p>
    </div>
  </div>

  <UButton
    label="Proceed to Payment"
    icon="i-heroicons-credit-card"
    size="xl"
    block
    class="mb-8 shadow-sm"
    :loading="pending"
    @click="createPaymentLink"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  domains: string[];
}>();

const appStore = useAppStore();
const toast = useToast();

const pending = ref(false);

//create the payment link
async function createPaymentLink() {
  pending.value = true;
  try {
    const response = await useApi(`/payments/create-link`, {
      method: "POST",
      body: {
        domains: props.domains,
        username: appStore.getUsername(),
      },
    });
    // redirect to the payment page
    await navigateTo(response.url, {
      external: true,
    });
  } catch (error) {
    console.error("Error creating the payment link:", error);
    toast.add({
      title: "Error",
      description: "Failed to create the payment link",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}
</script>
