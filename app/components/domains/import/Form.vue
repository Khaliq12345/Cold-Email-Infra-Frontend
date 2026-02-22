<template>
  <div class="w-full mx-auto md:max-w-lg p-3">
    <UForm @submit.prevent="checkDomains" class="space-y-4">
      <UFormField
        label="Domain Names"
        description="Enter one or more domains (one per line or separated by commas)."
        :error="errorMessage"
      >
        <div class="flex flex-col gap-2">
          <UTextarea
            v-model="rawInput"
            placeholder="example.com&#10;test.io"
            size="xl"
            :rows="5"
            :disabled="isLoading"
            class="flex-1"
            icon="i-heroicons-globe-alt"
          />
          <UButton
            type="submit"
            color="primary"
            size="xl"
            block
            :loading="isLoading"
            :disabled="!rawInput.trim()"
            label="Bulk Import & Verify"
          />
        </div>
      </UFormField>

      <div v-if="results.length > 0" class="mt-4 space-y-2">
        <p class="text-sm font-medium">Results:</p>
        <div
          v-for="res in results"
          :key="res.domain"
          class="flex justify-between p-2 border rounded text-sm"
        >
          <span>{{ res.domain }}</span>
          <span v-if="res.status === 'checking'" class="text-gray-400"
            >Checking...</span
          >
          <span
            v-else-if="res.status === 'valid'"
            class="text-green-500 font-bold"
            >✓ Registered</span
          >
          <span v-else class="text-red-500">✗ Not Found</span>
        </div>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
const isValid = defineModel("isValid"); // true if at least one is valid
const domainsList = defineModel("domains"); // Should probably be string[] now

const rawInput = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

interface DomainResult {
  domain: string;
  status: "checking" | "valid" | "invalid";
}
const results = ref<DomainResult[]>([]);

async function checkDomains() {
  // 1. Parse input: split by newlines or commas, then trim and remove empty strings
  const domainArray = rawInput.value
    .split(/[\n,]+/)
    .map((d) => d.trim())
    .filter((d) => d.length > 0);

  if (domainArray.length === 0) {
    errorMessage.value = "Please enter at least one domain.";
    return;
  }

  // Reset states
  errorMessage.value = "";
  isLoading.value = true;
  isValid.value = false;
  results.value = domainArray.map((d) => ({ domain: d, status: "checking" }));

  const verifiedDomains: string[] = [];

  // 2. Check one at a time
  for (const item of results.value) {
    try {
      const data = await useApi(
        `/domains/check-availability?domain=${item.domain}`,
      );

      // logic: available === false means it exists (is registered)
      if (!data.available) {
        item.status = "valid";
        verifiedDomains.push(item.domain);
      } else {
        item.status = "invalid";
      }
    } catch (err) {
      item.status = "invalid";
    }
  }

  // Update models
  domainsList.value = verifiedDomains;
  isValid.value = verifiedDomains.length > 0;
  isLoading.value = false;
  console.log(isValid, " IS VALID");
}
</script>
