<template>
  <div class="p-2">
    <UDrawer
      direction="right"
      :handle="false"
      :ui="{ content: 'w-screen h-screen md:max-w-md' }"
      description="Fill the following for the checkout"
      title="Checkout form"
    >
      <UButton
        label="Confirm"
        color="neutral"
        variant="outline"
        :disabled="disabled"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      />

      <template #content>
        <div class="h-full w-full p-4 overflow-y-scroll">
          <div class="mb-4">
            <h2 class="text-xl font-bold">Checkout form</h2>
            <p class="text-sm">
              This information is required for domain ownership records and to
              ensure we can contact you regarding your registration.
            </p>
            <p class="text-sm font-medium mt-2">Domain: {{ domain }}</p>
          </div>

          <!-- Registrant -->
          <UCollapsible>
            <UButton
              variant="ghost"
              color="neutral"
              class="w-full flex items-center justify-between"
            >
              Registrant
            </UButton>
            <template #content>
              <UForm
                :schema="contactSchema"
                :state="formState.registrant"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <UFormField label="First name" required>
                  <UInput
                    v-model="formState.registrant.firstName"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Last name" required>
                  <UInput
                    v-model="formState.registrant.lastName"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Organization" class="md:col-span-2">
                  <UInput
                    v-model="formState.registrant.organizationName"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Email" required class="md:col-span-2">
                  <UInput
                    v-model="formState.registrant.emailAddress"
                    type="email"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Country" required>
                  <USelect
                    v-model="formState.registrant.country"
                    :options="countries"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Phone Number" required>
                  <UInput
                    v-model="formState.registrant.phone"
                    type="tel"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Address line 1" required>
                  <UInput
                    v-model="formState.registrant.address1"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Address line 2">
                  <UInput
                    v-model="formState.registrant.address1"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="City" required>
                  <UInput v-model="formState.registrant.city" class="w-full" />
                </UFormField>
                <UFormField label="State/Province" required>
                  <UInput
                    v-model="formState.registrant.stateProvince"
                    class="w-full"
                  />
                </UFormField>
                <UFormField label="Postal Code" required class="md:col-span-2">
                  <UInput
                    v-model="formState.registrant.postalCode"
                    class="w-full"
                  />
                </UFormField>
              </UForm>
            </template>
          </UCollapsible>

          <!-- Admin Contact -->
          <UCollapsible class="mt-2">
            <div class="flex gap-2 items-center justify-between">
              <UButton variant="ghost" color="neutral" class="w-full">
                Admin Contact
              </UButton>
              <UCheckbox
                v-model="syncAdmin"
                label="Same as registrant"
                class="text-nowrap"
                @change="handleSync('admin', $event)"
              />
            </div>
            <template #content>
              <UForm
                :schema="contactSchema"
                :state="formState.admin"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                :disabled="syncAdmin"
              >
                <UFormField label="First name" required>
                  <UInput
                    v-model="formState.admin.firstName"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Last name" required>
                  <UInput
                    v-model="formState.admin.lastName"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Organization" class="md:col-span-2">
                  <UInput
                    v-model="formState.admin.organizationName"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Email" required class="md:col-span-2">
                  <UInput
                    v-model="formState.admin.emailAddress"
                    type="email"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Country" required>
                  <USelect
                    v-model="formState.admin.country"
                    :options="countries"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Phone Number" required>
                  <UInput
                    v-model="formState.admin.phone"
                    type="tel"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Address line 1" required>
                  <UInput
                    v-model="formState.admin.address1"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Address line 2">
                  <UInput
                    v-model="formState.admin.address2"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="City" required>
                  <UInput
                    v-model="formState.admin.city"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="State/Province" required>
                  <UInput
                    v-model="formState.admin.stateProvince"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
                <UFormField label="Postal Code" required class="md:col-span-2">
                  <UInput
                    v-model="formState.admin.postalCode"
                    class="w-full"
                    :disabled="syncAdmin"
                  />
                </UFormField>
              </UForm>
            </template>
          </UCollapsible>

          <!-- Tech Contact -->
          <UCollapsible class="mt-2">
            <div class="flex gap-2 items-center justify-between">
              <UButton variant="ghost" color="neutral" class="w-full">
                Tech Contact
              </UButton>
              <UCheckbox
                class="text-nowrap"
                v-model="syncTech"
                label="Same as registrant"
                @change="handleSync('tech', $event)"
              />
            </div>
            <template #content>
              <UForm
                :schema="contactSchema"
                :state="formState.tech"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                :disabled="syncTech"
              >
                <UFormField label="First name" required>
                  <UInput
                    v-model="formState.tech.firstName"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Last name" required>
                  <UInput
                    v-model="formState.tech.lastName"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Organization" class="md:col-span-2">
                  <UInput
                    v-model="formState.tech.organizationName"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Email" required class="md:col-span-2">
                  <UInput
                    v-model="formState.tech.emailAddress"
                    type="email"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Country" required>
                  <USelect
                    v-model="formState.tech.country"
                    :options="countries"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Phone Number" required>
                  <UInput
                    v-model="formState.tech.phone"
                    type="tel"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Address line 1" required>
                  <UInput
                    v-model="formState.tech.address1"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Address line 2">
                  <UInput
                    v-model="formState.tech.address2"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="City" required>
                  <UInput
                    v-model="formState.tech.city"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="State/Province" required>
                  <UInput
                    v-model="formState.tech.stateProvince"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
                <UFormField label="Postal Code" required class="md:col-span-2">
                  <UInput
                    v-model="formState.tech.postalCode"
                    class="w-full"
                    :disabled="syncTech"
                  />
                </UFormField>
              </UForm>
            </template>
          </UCollapsible>

          <UButton
            type="submit"
            class="w-full mt-6"
            :loading="isLoading"
            @click="onSubmit"
          >
            Complete Purchase
          </UButton>
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// Type Contact manquant - à créer dans ~/types/contact.ts
export interface Contact {
  firstName: string;
  lastName: string;
  organizationName?: string;
  emailAddress: string;
  country: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
}

const toast = useToast();

const props = defineProps<{
  domain: string;
  disabled?: boolean;
}>();

const countries = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organizationName: z.string().optional(),
  emailAddress: z.string().email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
  address1: z.string().min(1, "Address line 1 is required"),
  city: z.string().min(1, "City is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

// Correction: utiliser contactSchema au lieu de schema
type Schema = z.output<typeof contactSchema>;

const formState = reactive<{
  registrant: Contact;
  admin: Contact;
  tech: Contact;
}>({
  registrant: {
    firstName: "",
    lastName: "",
    organizationName: "",
    emailAddress: "",
    country: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  },
  admin: {
    firstName: "",
    lastName: "",
    organizationName: "",
    emailAddress: "",
    country: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  },
  tech: {
    firstName: "",
    lastName: "",
    organizationName: "",
    emailAddress: "",
    country: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  },
});

// État des collapsibles
const isRegistrantOpen = ref(true);
const isAdminOpen = ref(false);
const isTechOpen = ref(false);

// Cases à cocher de synchronisation
const syncAdmin = ref(false);
const syncTech = ref(false);

function handleSync(type: "admin" | "tech", checked: boolean) {
  if (checked) {
    formState[type] = { ...formState.registrant };
  }
}

const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;

  try {
    const payload = {
      registrant: formState.registrant,
      admin: syncAdmin.value ? formState.registrant : formState.admin,
      tech: syncTech.value ? formState.registrant : formState.tech,
    };

    const response = await $fetch("/api/domains/register", {
      method: "POST",
      body: {
        domain: props.domain,
        contacts: payload,
      },
    });

    toast.add({
      title: "Success",
      description: "Domain registration completed!",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Registration failed. Please try again.",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
