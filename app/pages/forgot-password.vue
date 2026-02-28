<template>
  <div>
    <CustomAuth :fields="fields" :schema="schema" :submit-function="onSubmit">
      <template #description>
        Enter your email to receive a password reset link.
      </template>

      <template #password-hint>
        <ULink
          to="/forgot-password"
          class="text-primary-500 hover:text-primary-600 font-medium underline"
          tabindex="-1"
          >Forgot password?</ULink
        >
      </template>

      <template #footer>
        <div class="text-center mt-4">
          <p class="text-sm text-gray-500 dark:text-zinc-400">
            Remember your password?
            <ULink
              to="/login"
              class="text-primary-500 hover:text-primary-600 font-medium underline"
              >Login</ULink
            >
          </p>
        </div>
      </template>
    </CustomAuth>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ skipAuth: true, layout: false });
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your registered email",
    required: true,
  },
];

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    // Using the useApi composable we optimized earlier
    await useApi("/auth/forgot-password", {
      method: "POST",
      body: { email: payload.data.email },
    });

    toast.add({
      title: "Email Sent",
      description: "Check your inbox for reset instructions.",
      color: "success",
    });
  } catch (error: any) {
    // error.data.message will be caught here thanks to our useApi logic
    toast.add({
      title: "Request Failed",
      description:
        error.data?.message || "Could not process request. Please try again.",
      color: "error",
    });
  }
}
</script>
