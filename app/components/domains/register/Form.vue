<template>
  <div class="md:max-w-4xl space-y-2">
    <p class="text-sm text-left">Search for a new domain.</p>
    <UForm
      :schema="schema"
      :state="state"
      class="flex items-center gap-2"
      @submit="onSubmit"
    >
      <UInput v-model="state.name" class="flex-1 min-w-0" />
      <UButton type="submit">Submit</UButton>
    </UForm>
    <p class="text-sm text-left text-wrap max-w-xs">Review domain registration documentation and supported TLD's.</p>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  name: z.string("Name is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>