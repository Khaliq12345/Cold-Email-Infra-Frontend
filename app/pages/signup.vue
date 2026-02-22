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
        title="Create an Account"
        align="bottom"
        icon="i-heroicons-user-plus"
        :ui="{
          header: 'text-center mb-6',
          title:
            'text-3xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-50',
          description: 'text-gray-500 dark:text-zinc-400',
          submit: {
            size: 'lg',
            block: true,
            class:
              'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors',
          },
        }"
        @submit="onSubmit"
      >
        <template #description>
          Sign up today to start managing your email domains.
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
      </UAuthForm>
    </UPageCard>
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
    loading.value = true;
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
  } finally {
    loading.value = false;
  }
}
</script>
