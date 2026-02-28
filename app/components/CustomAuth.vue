<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300"
  >
    <ThemeToggle class="fixed top-4 right-4 z-50" />

    <UPageCard
      class="w-full max-w-md shadow-2xl"
      :ui="{
        root: 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 ring-1 ring-gray-200 dark:ring-zinc-800',
        body: 'p-8',
      }"
    >
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :loading="loading"
        :ui="{
          header: 'text-center mb-6',
          title:
            'text-3xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-50',
          description: 'text-gray-500 dark:text-zinc-400',
          // Dynamic button color: black in light mode, primary/white in dark mode
          submit: {
            size: 'lg',
            block: true,
            class:
              'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors',
          },
          body: 'space-y-4',
        }"
        @submit="onSubmit"
      >
        <!-- This to display the different variation of the logo (dark and white) -->
        <template #leading>
          <div class="flex justify-center mb-2">
            <img
              src="/name.png"
              alt="Existantly Logo"
              class="h-12 w-auto dark:hidden"
            />

            <img
              src="/name-white.png"
              alt="Existantly Logo"
              class="h-12 w-auto hidden dark:block"
            />
          </div>
        </template>

        <template #description>
          <slot name="description"></slot>
        </template>

        <template #password-hint>
          <slot name="password-hint"></slot>
        </template>

        <template #footer>
          <slot name="footer"></slot>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const props = defineProps<{
  fields: AuthFormField[];
  schema: object;
  submitFunction: any;
}>();

const loading: Ref<boolean> = ref(false);

type Schema = z.output<typeof props.schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    await props.submitFunction(payload);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (useAppStore().user) navigateTo("/domains");
});
</script>
