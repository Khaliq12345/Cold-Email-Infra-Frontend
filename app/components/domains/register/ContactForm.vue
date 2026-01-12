<template>
  <UForm
    :schema="contactSchema"
    :state="modelValue"
    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 mx-2"
  >
    <UFormField label="First name" required name="firstName">
      <UInput
        :model-value="modelValue.firstName"
        @update:model-value="updateField('firstName', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="Last name" required name="lastName">
      <UInput
        :model-value="modelValue.lastName"
        @update:model-value="updateField('lastName', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField
      label="Organization"
      class="md:col-span-2"
      name="organizationName"
    >
      <UInput
        :model-value="modelValue.organizationName"
        @update:model-value="updateField('organizationName', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField
      label="Email"
      required
      class="md:col-span-2"
      name="emailAddress"
    >
      <UInput
        :model-value="modelValue.emailAddress"
        @update:model-value="updateField('emailAddress', $event)"
        type="email"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="Country" required name="country">
      <USelect
        :model-value="modelValue.country"
        @update:model-value="updateField('country', $event)"
        :items="countries"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="Phone Number" required name="phone">
      <UInput
        :model-value="modelValue.phone"
        @update:model-value="updateField('phone', $event)"
        type="tel"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="Address line 1" required name="address1">
      <UInput
        :model-value="modelValue.address1"
        @update:model-value="updateField('address1', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="Address line 2" name="address2">
      <UInput
        :model-value="modelValue.address2"
        @update:model-value="updateField('address2', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="City" required name="city">
      <UInput
        :model-value="modelValue.city"
        @update:model-value="updateField('city', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField label="State/Province" required name="stateProvince">
      <UInput
        :model-value="modelValue.stateProvince"
        @update:model-value="updateField('stateProvince', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>

    <UFormField
      label="Postal Code"
      required
      class="md:col-span-2"
      name="postalCode"
    >
      <UInput
        :model-value="modelValue.postalCode"
        @update:model-value="updateField('postalCode', $event)"
        class="w-full"
        :disabled="disabled"
      />
    </UFormField>
  </UForm>
</template>

<script lang="ts" setup>
import type { Contact } from "~/types/contact";
import * as z from "zod";

const props = defineProps<{
  modelValue: Contact;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Contact];
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
  phone: z.string().regex(/^\+\d{1,3}\.\d+$/),
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

function updateField(field: keyof Contact, value: any) {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
}
</script>
