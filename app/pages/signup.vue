<template>
  <div>
    <CustomAuth :fields="fields" :schema="schema" :submit-function="onSubmit">
      <template #description>
        Sign up today to start managing your email domains.
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
        <div class="text-center space-y-4">
          <p class="text-sm text-gray-600 dark:text-zinc-400">
            Already have an account?
            <ULink
              to="/login"
              class="text-primary-500 font-semibold hover:underline"
              >Login</ULink
            >
          </p>
          <p class="text-xs text-gray-400 dark:text-zinc-500">
            By creating an account, you agree to our
            <ULink to="#" class="text-primary-500 underline">Terms</ULink> &
            <ULink to="#" class="text-primary-500 underline"
              >Privacy Policy</ULink
            >.
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
const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: "firstname",
    label: "First Name",
    placeholder: "John",
    required: true,
  },
  {
    name: "lastname",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Choose a strong password",
    required: true,
  },
];

const schema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    await useApi("/auth/signup", {
      method: "POST",
      body: payload.data,
    });

    toast.add({
      title: "Account Created",
      description: "Welcome to Existantly! Redirecting to login...",
      color: "green",
    });

    // Short delay so they can see the toast
    setTimeout(() => navigateTo("/login"), 1500);
  } catch (error: any) {
    toast.add({
      title: "Signup Failed",
      description:
        error?.data?.message || "There was an error creating your account.",
      color: "red",
    });
  }
}
</script>
