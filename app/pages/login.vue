<template>
  <div>
    <ThemeToggle class="fixed top-4 right-4 z-50" />
  </div>
  <div class="flex min-h-screen flex-col items-center justify-center gap-1 p-2">
    <div class="text-center space-y-2">
      <h1 class="text-4xl">Enterprise</h1>
      <h2 class="text-sm">Login to your account</h2>
    </div>
    <UPageCard class="w-full max-w-md ring-0">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
  <!-- termis & service -->
  <div class="fixed bottom-0 left-0 w-full text-xs text-center text-monoc-300 p-4">
    <p>Terms of service and privacy policy</p>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

definePageMeta({
  layout: false,
})

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const schema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log("Submitted", payload);
}
</script>
