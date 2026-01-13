<template>
  <div class="w-full mx-auto md:max-w-lg p-3">
    <UForm @submit.prevent="checkDomain" class="space-y-4">
      <UFormField
        label="Domain Name"
        description="Enter the domain you'd like to point to our servers."
        :error="errorMessage"
      >
        <div class="flex items-center gap-2">
          <UInput
            v-model="domain"
            placeholder="example.com"
            size="xl"
            clearable
            :disabled="isLoading"
            class="flex-1"
            icon="i-heroicons-globe-alt"
          />
          <UButton
            type="submit"
            color="primary"
            size="xl"
            :loading="isLoading"
            :disabled="!domainTrimmed"
            label="Import"
          />
        </div>
      </UFormField>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
const isValid = defineModel("isValid");
const domain = defineModel("domain");

const isLoading = ref(false);
const errorMessage = ref("");

// Clean validation check
const domainTrimmed = computed(() => domain.value?.trim());

async function checkDomain() {
  if (!domainTrimmed.value) {
    errorMessage.value = "Please enter a domain name.";
    return;
  }

  // Basic regex to avoid checking nonsense strings
  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domainTrimmed.value)) {
    errorMessage.value =
      "Please enter a valid domain format (e.g., example.com).";
    return;
  }

  errorMessage.value = "";
  isLoading.value = true;
  isValid.value = false;

  try {
    const data = await useApi(`/domains/status/${domainTrimmed.value}`);

    // If API confirms availability/validity
    if (!data.status.available) {
      isValid.value = true;
      domain.value = domainTrimmed.value;
      console.log(domain.value, isValid.value);
    } else {
      errorMessage.value = "This domain is not registered";
    }
  } catch (err: any) {
    errorMessage.value =
      err?.data?.message || "Could not verify domain. Try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>
