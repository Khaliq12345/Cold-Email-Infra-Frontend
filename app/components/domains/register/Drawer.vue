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
          <UCollapsible :default-open="true">
            <UButton
              variant="ghost"
              color="neutral"
              class="w-full flex items-center justify-between"
            >
              Registrant
            </UButton>
            <template #content>
              <DomainsRegisterContactForm v-model="formState.registrant" />
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
              />
            </div>
            <template #content>
              <DomainsRegisterContactForm
                v-model="formState.admin"
                :disabled="syncAdmin"
              />
            </template>
          </UCollapsible>

          <!-- Tech Contact -->
          <UCollapsible class="mt-2">
            <div class="flex gap-2 items-center justify-between">
              <UButton variant="ghost" color="neutral" class="w-full">
                Tech Contact
              </UButton>
              <UCheckbox
                v-model="syncTech"
                label="Same as registrant"
                class="text-nowrap"
              />
            </div>
            <template #content>
              <DomainsRegisterContactForm
                v-model="formState.tech"
                :disabled="syncTech"
              />
            </template>
          </UCollapsible>

          <!-- AuxBilling Contact -->
          <UCollapsible class="mt-2">
            <div class="flex gap-2 items-center justify-between">
              <UButton variant="ghost" color="neutral" class="w-full">
                Billing Contact
              </UButton>
              <UCheckbox
                v-model="syncBilling"
                label="Same as registrant"
                class="text-nowrap"
              />
            </div>
            <template #content>
              <DomainsRegisterContactForm
                v-model="formState.billing"
                :disabled="syncBilling"
              />
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
import type { Contact } from "~/types/contact";
import * as z from "zod";

const toast = useToast();

const props = defineProps<{
  domain: string;
  disabled?: boolean;
}>();

const emptyContact = (): Contact => ({
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
});

const formState = reactive<{
  registrant: Contact;
  admin: Contact;
  tech: Contact;
}>({
  registrant: emptyContact(),
  admin: emptyContact(),
  tech: emptyContact(),
  billing: emptyContact(),
});

const syncAdmin = ref(false);
const syncTech = ref(false);
const syncBilling = ref(false);

// Watch for sync changes
watch(syncAdmin, (isSync) => {
  if (isSync) {
    formState.admin = { ...formState.registrant };
  }
});

watch(syncTech, (isSync) => {
  if (isSync) {
    formState.tech = { ...formState.registrant };
  }
});

watch(syncBilling, (isSync) => {
  if (isSync) {
    formState.billing = { ...formState.registrant };
  }
});

// Watch registrant changes and sync to admin/tech if needed
watch(
  () => formState.registrant,
  (newRegistrant) => {
    if (syncAdmin.value) {
      formState.admin = { ...newRegistrant };
    }
    if (syncTech.value) {
      formState.tech = { ...newRegistrant };
    }
    if (syncBilling.value) {
      formState.billing = { ...newRegistrant };
    }
  },
  { deep: true },
);

const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;
  try {
    const payload = {
      registrant: formState.registrant,
      admin: syncAdmin.value ? formState.registrant : formState.admin,
      tech: syncTech.value ? formState.registrant : formState.tech,
      billing: syncBilling.value ? formState.registrant : formState.billing,
    };
    console.log(payload);

    const response = await useApi(`/namecheap/domains/create/khaliq`, {
      method: "POST",
      body: {
        domainName: props.domain,
        years: 2,
        registrant: payload.registrant,
        admin: payload.admin,
        tech: payload.tech,
        auxBilling: payload.billing,
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
