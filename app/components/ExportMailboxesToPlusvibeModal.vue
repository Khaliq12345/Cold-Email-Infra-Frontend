<template>
  <UModal
    v-model:open="isOpen"
    title="Select Workspace and Export Domains"
    description="Select Workspace and Export domain mailboxes"
  >
    <template #content>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Select Plusvibe Workspace
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="p-4 space-y-4">
          <UButton
            color="primary"
            label="Update Plusvibe API Key"
            @click="navigateTo('/settings')"
          />
          <USelect
            v-model="workspaceId"
            :items="workspaceIds"
            class="w-full"
            placeholder="Choose Workspace..."
            :loading="pending"
            loading-icon="i-lucide-loader"
          />
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              color="gray"
              variant="ghost"
              label="Cancel"
              @click="isOpen = false"
            />
            <UButton
              color="primary"
              label="Go"
              :disabled="!workspaceId"
              @click="plusvibeWorkspaceSelected(workspaceId)"
              :loading="pending"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel();
const pending = ref(false);
const workspaceIds = ref<SelectItem[]>([]);
const workspaceId = ref("");
const toast = useToast();
const appStore = useAppStore();

const props = defineProps<{
  domains: string[];
}>();

const emit = defineEmits(["workspaceSelected"]);

//load plusvibe workspaces
async function getPlusvibeWorkspaces() {
  pending.value = true;
  try {
    const response = await useApi(
      `/plusvibe/workspaces?username=${appStore.getUsername()}`,
      {
        method: "GET",
      },
    );
    workspaceIds.value = response.workspaces.map((record) => ({
      label: record.name,
      value: record._id,
    }));
  } catch (error) {
    console.error("Error loading Workspaces:", error);
    toast.add({
      title: "Error",
      description:
        "Failed to load Workspaces, verify your plusvibe api key and try again",
      color: "error",
    });
  } finally {
    pending.value = false;
  }
}

// Update plusvibe workspace
async function plusvibeWorkspaceSelected(workspaceId: string) {
  pending.value = true;
  try {
    const response = await useApi(`plusvibe/workspace/add-mailboxes`, {
      method: "POST",
      body: {
        domains: props.domains,
        workspaceId: workspaceId,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(
      "Error Exporting the Mailboxes, verify your plusvibe api key and try again:",
      error,
    );
    toast.add({
      title: "Error Updating Workspace ID",
      description:
        "Error Exporting the Mailboxes, verify your plusvibe api key and try again:",
      color: "error",
    });
  } finally {
    pending.value = false;
    window.location.reload();
  }
}

onMounted(async () => {
  await getPlusvibeWorkspaces();
});
</script>
