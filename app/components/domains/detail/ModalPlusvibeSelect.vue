<template>
  <UModal v-model:open="isOpen">
    <UButton
      v-if="!domainDetails.plusvibe_workspace"
      color="gray"
      variant="ghost"
      icon="i-lucide-link"
      label="Link Plusvibe"
      size="sm"
      @click="isOpen = true"
      :loading="pending"
      :disabled="pending"
    />

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
          <p class="text-sm text-gray-500">
            Select the workspace you want to link to
            <strong>{{ domain }}</strong
            >.
          </p>
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
              label="Confirm Link"
              :disabled="!workspaceId"
              @click="plusvibeWorkspaceSelected(workspaceId)"
              :loading="pending"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <template v-if="!domainDetails"
    >"
    <USkeleton class="h-8 w-24 rounded-md" />
    <USkeleton class="h-8 w-24 rounded-md" />
  </template>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const pending = ref(false);
const workspaceIds = ref<SelectItem[]>([]);
const workspaceId = ref("");
const toast = useToast();

const props = defineProps<{
  domainDetails: any;
  domain: string;
  username: string;
}>();

const emit = defineEmits(["updateWorkspace"]);

//load plusvibe workspaces
async function getPlusvibeWorkspaces() {
  pending.value = true;
  try {
    const response = await useApi(
      `/plusvibe/workspaces?username=${props.username}`,
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
      description: "Failed to load Workspaces",
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
    const response = await useApi(`plusvibe/domain/link-workspace`, {
      method: "PUT",
      body: {
        domain: props.domain,
        workspaceId: workspaceId,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(
      "Error Updating Workspace ID, verify your plusvibe api key and try again:",
      error,
    );
    toast.add({
      title: "Error Updating Workspace ID",
      description:
        "Error Updating Workspace ID, verify your plusvibe api key and try again",
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
