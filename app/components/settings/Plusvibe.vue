<template>
  <div class="flex flex-col space-y-5">
    <div class="flex items-center gap-3">
      <UIcon name="i-lucide-layers" class="size-5 text-blue-500" />
      <h3 class="font-semibold text-gray-900 dark:text-white">
        PlusVibe Integration
      </h3>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400">
      Connect your PlusVibe account to sync workspaces with your domains.
    </p>

    <UFormGroup
      label="API Key"
      help="Your key is stored securely and used to fetch workspace data."
    >
      <div class="flex gap-2">
        <UInput
          v-model="plusvibeKey"
          type="password"
          placeholder="pv_xxxxxxxxxxxxxxxx"
          class="flex-1"
          icon="i-heroicons-key"
        />
        <UButton
          label="Update Key"
          variant="solid"
          :loading="saving"
          @click="updatePluvibeKey"
        />
      </div>
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
const plusvibeKey = ref("");
const saving = ref(false);
const toast = useToast();
const appStore = useAppStore();
const success = ref("");

// Get Domain Details
async function updatePluvibeKey() {
  if (!plusvibeKey.value) {
    toast.add({ title: "Please enter an API key", color: "orange" });
    return;
  }

  saving.value = true;
  try {
    const response = await useApi(`plusvibe/user/apikey`, {
      method: "POST",
      body: {
        username: appStore.getUsername(),
        apiKey: plusvibeKey.value,
      },
    });
    success.value = response.success;
    toast.add({
      title: "Settings Updated",
      description: "Your PlusVibe API key has been saved successfully.",
      color: "green", // Use 'green' for success
      icon: "i-heroicons-check-circle",
    });
  } catch (error) {
    console.error("Error Updating your plusvibe API key:", error);
    toast.add({
      title: "Update Failed",
      description:
        error.data?.message || "Could not save key, please try again.",
      color: "red",
    });
  } finally {
    saving.value = false;
  }
}
</script>
