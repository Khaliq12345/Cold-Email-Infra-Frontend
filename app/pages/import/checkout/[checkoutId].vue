<template>
  <UPageSection
    :icon="
      pending
        ? 'i-heroicons-arrow-path-20-solid'
        : isValid
          ? 'i-heroicons-check-circle-20-solid'
          : 'i-heroicons-exclamation-circle-20-solid'
    "
    :title="
      pending
        ? 'Verifying Payment...'
        : isValid
          ? 'Payment Successful'
          : 'Payment Unsuccessful'
    "
    :ui="{
      icon: pending
        ? 'animate-spin text-gray-400'
        : isValid
          ? 'text-primary'
          : 'text-red-500',
      title: [
        'text-2xl font-bold',
        pending
          ? 'text-gray-500'
          : isValid
            ? 'text-gray-900 dark:text-white'
            : 'text-red-600 dark:text-red-400',
      ],
    }"
  >
    <template #description>
      <p v-if="pending" class="text-gray-600 dark:text-gray-400 italic">
        Please wait while we confirm your transaction with Stripe...
      </p>

      <p v-else-if="isValid" class="text-gray-600 dark:text-gray-400">
        Your transaction was completed successfully.
        <span class="font-medium text-primary"
          >Please ensure you update your server settings</span
        >
        to reflect the new changes.
      </p>

      <p v-else class="text-gray-600 dark:text-gray-400">
        Something went wrong with your transaction. Please
        <button
          @click="refreshPage"
          class="font-medium text-red-500 hover:underline"
        >
          refresh the page</button
        >. If payment has been deducted, please
        <span class="font-medium text-primary">contact our support team</span>.
      </p>
    </template>

    <template #links v-if="!pending">
      <template v-if="isValid">
        <UModal
          title="Setup nameservers"
          description="Description of how to setup nameservers"
        >
          <UButton
            label="Setup nameservers"
            icon="i-lucide-square-play"
            size="lg"
          />
          <template #content>
            <div class="p-5">
              <DomainsImportNameServer />
            </div>
          </template>
        </UModal>

        <UButton
          label="Go to domains"
          to="/domains"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-arrow-right"
          size="lg"
        />
      </template>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
const route = useRoute();
const isValid = ref(false);
const pending = ref(true); // Start in loading state

const refreshPage = () => {
  window.location.reload();
};

const getCheckout = async () => {
  pending.value = true;
  try {
    const response = await useApi(
      `/stripe/checkout/session/${route.params.checkoutId}`,
    );
    isValid.value = response.isValid;
  } catch (error) {
    console.error("Payment verification failed:", error);
    isValid.value = false;
  } finally {
    // Add a slight delay if the API is too fast so the user sees the confirmation
    setTimeout(() => {
      pending.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCheckout();
});
</script>
