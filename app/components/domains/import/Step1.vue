<template>
  <div class="w-full mx-auto md:max-w-md space-y-6">
    <!-- Input + Import -->
    <form
      @submit.prevent="checkDomain"
      class="mx-auto max-w-md flex items-center justify-center gap-3"
    >
      <UInput
        v-model="domain"
        placeholder="Enter a domain"
        label="Domain"
        size="lg"
        clearable
        :disabled="isLoading"
        class="md:flex-1"
      />

      <UButton
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        :disabled="!domainTrimmed || isLoading"
      >
        <span v-if="isLoading">Checking…</span>
        <span v-else>Import</span>
      </UButton>
    </form>

    <!-- Error -->
    <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
type format = null | {
  domain: string;
  status: { name: string; available: boolean; lookupType: string };
};
const emit = defineEmits(["domainValidated", "subscribeClicked"]);

const domain = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const result = ref<format>(null);

// computed trimmed
const domainTrimmed = computed(() => domain.value.trim());

// subscribe button visible when valid result
const showSubscribe = computed(
  () => !!result.value && result.value.status.available,
);

async function checkDomain() {
  errorMessage.value = "";
  result.value = null;

  const value = domainTrimmed.value;
  if (!value) {
    errorMessage.value = "Domain is required.";
    return;
  }

  isLoading.value = true;

  try {
    const payload = await useApi(`/domains/status/${value}`);

    // API might return wrapped data in response
    if (!payload) {
      throw new Error("Invalid server response.");
    }

    result.value = payload as format;

    // Emit only if available
    if (result.value?.status.available) {
      emit("domainValidated", result.value);
    }
  } catch (err: any) {
    errorMessage.value = err?.message || "Unexpected error.";
  } finally {
    isLoading.value = false;
  }
}

function onSubscribe() {
  emit("subscribeClicked", result.value);
}
</script>
