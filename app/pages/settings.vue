<template>
  <UContainer class="w-full pt-5">
    <UPageCard
      variant="outline"
      :ui="{
        title: 'text-2xl font-bold text-gray-900 dark:text-white',
        description:
          'text-lg font-semibold text-gray-700 dark:text-gray-300 mt-2',
      }"
    >
      <template #title> Account Settings </template>

      <template #description>
        Manage your profile and external integrations.
      </template>

      <div class="mt-6">
        <SettingsPlusvibe />
      </div>
    </UPageCard>

    <UCard class="opacity-50">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-user" class="size-5" />
        <span class="text-sm font-medium">Profile Settings (Coming Soon)</span>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const plusvibeKey = ref("");
const saving = ref(false);
const toast = useToast();

// Sidebar links
const sideLinks = [
  { label: "General", icon: "i-heroicons-user" },
  { label: "Integrations", icon: "i-heroicons-link", active: true },
  { label: "Billing", icon: "i-heroicons-credit-card" },
];

const updateKey = async () => {
  if (!plusvibeKey.value) return;

  saving.value = true;
  try {
    // This calls your safe .update() service on the users table
    await $fetch("/api/plusvibe/user/apikey", {
      method: "POST",
      body: {
        username: "current_user", // Replace with your actual auth state
        apiKey: plusvibeKey.value,
      },
    });
    toast.add({
      title: "Success",
      description: "PlusVibe key updated.",
      color: "green",
    });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Failed to save key.",
      color: "red",
    });
  } finally {
    saving.value = false;
  }
};
</script>
