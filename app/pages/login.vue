<template>
  <div>
    <ThemeToggle class="fixed top-4 right-4 z-50" />
  </div>
  <div class="flex min-h-screen flex-col items-center justify-center gap-1 p-2">
    <div class="text-center space-y-2">
      <h1 class="text-4xl">Existantly</h1>
      <h2 class="text-sm">Login to your account</h2>
    </div>
    <UPageCard class="w-full max-w-md ring-0">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
        :loading="loading"
      />
    </UPageCard>
  </div>
  <!-- termis & service -->
  <div
    class="fixed bottom-0 left-0 w-full text-xs text-center text-monoc-300 p-4"
  >
    <p>Terms of service and privacy policy</p>
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
