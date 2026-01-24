<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4"
  >
    <ThemeToggle class="fixed top-4 right-4 z-50" />

    <UPageCard
      class="w-full max-w-md ring-0 shadow-xl"
      :ui="{
        root: 'bg-white dark:bg-black border-none ring-0',
        body: 'p-8',
      }"
    >
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :loading="loading"
        title="Existantly"
        :ui="{
          header: 'text-center mb-6',
          title:
            'text-3xl font-bold tracking-tight text-gray-900 dark:text-white',
          description: 'text-gray-500 dark:text-gray-400',
          // Use 'white' or 'black' color for the button to avoid primary-blue/gray defaults
          submit: { size: 'lg', block: true, color: 'black' },
          // Force the form body itself to be transparent so no gray peaks through
          body: 'dark:bg-transparent bg-white',
        }"
        @submit="onSubmit"
      >
        <template #leading>
          <img
            src="/logo.webp"
            alt="Existantly Logo"
            class="mx-auto h-12 w-auto mb-2"
          />
        </template>

        <template #description>
          Login to your account to manage your emails.
        </template>

        <template #footer>
          <p class="text-xs text-gray-400">
            By signing in, you agree to our
            <ULink to="#" class="text-primary underline">Terms of Service</ULink
            >.
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ skipAuth: true, layout: false });
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import type { User } from "~/types/user";

const toast = useToast();
const loading: Ref<boolean> = ref(false);

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
    .min(4, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const response = await useApi("/auth/login", {
      method: "POST",
      body: { email: payload.data.email, password: payload.data.password },
    });
    toast.add({
      title: "Success",
      description: "Login successful!",
      color: "success",
    });
    const appStore = useAppStore();
    console.log("login response: ", response);
    appStore.setUser(response as User);
    await navigateTo("/domains");
  } catch (error) {
    console.log("LOGIN ERROR ", error);
    toast.add({
      title: "Error while login",
      description: "Please check your credentials",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  if (useAppStore().user) navigateTo("/domains");
});
</script>
