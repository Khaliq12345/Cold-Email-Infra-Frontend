<template>
  <div class="w-full space-y-4" v-if="domains.length > 0">
    <div
      v-for="item in domains"
      :key="item.domain"
      class="w-full border-b border-gray-100 dark:border-gray-800 last:border-none"
    >
      <UCollapsible v-model:open="item.open" class="w-full">
        <!-- Trigger avec chevron aligné à droite -->
        <template #default>
          <button class="w-full flex items-center justify-between p-3">
            <span
              class="text-lg font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
            >
              {{ item.domain }}
            </span>
            <UIcon
              :name="
                item.open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
              "
              class="size-5 transition-transform duration-150"
            />
          </button>
        </template>

        <!-- Contenu lorsqu'ouvert -->
        <template #content>
          <div class="w-full px-3 pb-3 flex flex-wrap items-center">
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-4 grow">
              <UBadge
                color="neutral"
                variant="soft"
                size="md"
                icon="i-heroicons-user-circle"
                class="capitalize"
              >
                {{ item.username }}
              </UBadge>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  :label="`PTR: ${item.ptr ? 'On' : 'Off'}`"
                  :color="item.ptr ? 'success' : 'error'"
                  variant="subtle"
                  size="md"
                />

                <UBadge
                  :label="`DKIM: ${item.dkim ? 'On' : 'Off'}`"
                  :color="item.dkim ? 'success' : 'error'"
                  variant="subtle"
                  size="md"
                />

                <UBadge
                  :label="`DMARC: ${item.dmarc ? 'On' : 'Off'}`"
                  :color="item.dmarc ? 'success' : 'error'"
                  variant="subtle"
                  size="md"
                />
              </div>
            </div>

            <!-- Boutons à droite, même dimension que les badges -->
            <div class="ml-auto flex gap-2 mt-2 sm:mt-0">
              <UButton
                color="primary"
                variant="soft"
                icon="i-heroicons-information-circle"
              >
                État
              </UButton>

              <UButton
                color="neutral"
                variant="solid"
                icon="i-heroicons-cog-6-tooth"
              >
                Configurer
              </UButton>
            </div>
          </div>
        </template>
      </UCollapsible>
    </div>
  </div>

  <!-- Skeleton -->
  <div v-else class="w-full space-y-4">
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="w-full border-b border-gray-100 dark:border-gray-800 last:border-none"
    >
      <!-- Trigger skeleton -->
      <div class="w-full flex items-center justify-between p-3">
        <USkeleton class="h-5 w-2/5" />
        <USkeleton class="h-5 w-5" />
      </div>

      <!-- Content skeleton -->
      <div class="w-full px-3 pb-3 flex flex-wrap items-center">
        <!-- Badges skeleton -->
        <div class="flex flex-wrap items-center gap-4 grow">
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
        </div>

        <!-- Buttons skeleton -->
        <div class="ml-auto flex gap-2 mt-2 sm:mt-0">
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
const skeletonCount = ref(3);
const toast = useToast();
const appStore = useAppStore();
const domains = ref<DomainList>([]);
async function getDomains() {
  try {
    const response = await useApi(
      `mailcow/domains/${appStore.user?.user.user_metadata.username}`,
      {},
    );

    domains.value = response as DomainList;
    console.log("domains: ", domains.value);
  } catch (error) {
    toast.add({
      title: "Error",
      description: "An error occur when getting domains, try again",
      color: "error",
    });
  }
}

onMounted(async () => {
  await getDomains();
});
</script>
