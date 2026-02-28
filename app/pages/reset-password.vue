<template>
  <div>
    <CustomAuth :fields="fields" :schema="schema" :submit-function="onSubmit">
      <template #description>
        Enter your new password below to regain access.
      </template>

      <template #footer>
        <div class="text-center mt-4">
          <ULink
            to="/login"
            class="text-sm text-primary-500 hover:text-primary-600 font-medium underline"
          >
            Back to Login
          </ULink>
        </div>
      </template>
    </CustomAuth>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

definePageMeta({ skipAuth: true, layout: false });

const route = useRoute();
const toast = useToast();

// 1. Create a helper to parse the hash
const getHashParams = () => {
  // .substring(1) removes the '#' character
  const hash = route.hash.substring(1);
  return new URLSearchParams(hash);
};

// 2. Extract the access_token && refresh_token
const params = getHashParams();
const accessToken = params.get("access_token");
const refreshToken = params.get("refresh_token");

console.log(accessToken);

const fields: AuthFormField[] = [
  {
    name: "password",
    type: "password",
    label: "New Password",
    placeholder: "********",
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm New Password",
    placeholder: "********",
    required: true,
  },
];

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  if (!accessToken) {
    toast.add({
      title: "Invalid Token",
      description: "Reset token is missing from the URL.",
      color: "error",
    });
    return;
  }
  console.log(accessToken);

  try {
    await useApi("/auth/reset-password", {
      method: "POST",
      body: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        password: payload.data.password,
      },
    });

    toast.add({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
      color: "success",
    });

    // Redirect to login after a brief delay
    setTimeout(() => navigateTo("/login"), 2000);
  } catch (error: any) {
    toast.add({
      title: "Reset Failed",
      description: error.data?.message || "Invalid or expired token.",
      color: "error",
    });
  }
}

onMounted(() => {
  if (!accessToken) {
    toast.add({
      title: "Warning",
      description: "No reset token found. Check your email link.",
      color: "warning",
    });
  }
});
</script>
