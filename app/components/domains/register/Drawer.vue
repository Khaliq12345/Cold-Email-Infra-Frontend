<template>
  <div class="p-2">
    <UDrawer
      direction="right"
      :handle="false"
      :ui="{ content: 'w-screen h-screen md:max-w-md' }"
      description="Fill the following for the checkout"
      title="Checkout form"
    >
      <UButton label="Confirm" color="neutral" variant="outline" />

      <template #content>
        <!-- <Placeholder class="min-w-96 min-h-96 size-full m-4" /> -->
        <div class="h-full w-full p-4 overflow-y-scroll">
          <div class="mb-4">
            <h2 class="text-xl font-bold">Checkout form</h2>
            <p class="text-sm ">This information is required for domain ownership records and to ensure we can contact you regarding your registration.</p>
          </div>
          <UForm
            :schema="schema"
            :state="state"
            class="grid items-center justify-center grid-cols-1 md:grid-cols-2 gap-4"
            @submit="onSubmit"
          >
            <UFormField label="First name" required>
              <UInput v-model="state.firstName" class="w-full" />
            </UFormField>
            <UFormField label="Last name" required>
              <UInput v-model="state.lastName" class="w-full" />
            </UFormField>
            <UFormField label="Organization" class="md:col-span-2">
              <UInput v-model="state.organization" class="w-full" />
            </UFormField>
            <UFormField label="Email" required class="md:col-span-2">
              <UInput v-model="state.email" type="email" class="w-full" />
            </UFormField>
            <UFormField label="Country" required>
              <USelect v-model="state.country" :options="countries" class="w-full" />
            </UFormField>
            <UFormField label="Phone Number" required>
              <UInput v-model="state.phone" type="tel" class="w-full" />
            </UFormField>
            <UFormField label="Address line 1" required>
              <UInput v-model="state.address1" class="w-full" />
            </UFormField>
            <UFormField label="Address line 2">
              <UInput v-model="state.address2" class="w-full" />
            </UFormField>
            <UFormField label="City" required>
              <UInput v-model="state.city" class="w-full" />
            </UFormField>
            <UFormField label="State/Province" required>
              <UInput v-model="state.state" class="w-full" />
            </UFormField>
            <UFormField label="Postal Code" required class="md:col-span-2">
              <UInput v-model="state.postalCode" class="w-full" />
            </UFormField>
            <UButton type="submit" class="w-full md:col-span-2 text-center">Complete Purchase</UButton>
          </UForm>
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const toast = useToast();

const countries = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
];

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organization: z.string().optional(),
  email: z.email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  organization: undefined,
  email: undefined,
  country: undefined,
  phone: undefined,
  address1: undefined,
  address2: undefined,
  city: undefined,
  state: undefined,
  postalCode: undefined,
});

function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "Domain registration completed!",
    color: "success",
  });
  console.log("Submitted", event.data);
}
</script>

<style></style>
