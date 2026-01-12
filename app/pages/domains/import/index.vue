<template>
  <div class="mx-auto py-8 space-y-6">
    <!-- Header -->
    <DomainsImportHeader />

    <!-- Step 1 -->
    <DomainsImportStep1
      @domainValidated="onDomainValidated"
      @subscribeClicked="onSubscribeClicked"
    />

    <div v-if="validatedDomain" class="mt-6 md:max-w-lg md:mx-auto">
      <UCard>
        <div class="mb-4">
          <h2 class="text-lg font-semibold flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-badge"
              class="text-green-500 w-6 h-6"
            />
            Domain
            <span class="text-primary-500">{{ validatedDomain.domain }}</span>
            is valid
          </h2>
        </div>

        <UButton
          to="/payment-page"
          label="Proceed to Payment"
          icon="i-heroicons-credit-card"
          block
          class="mb-6"
        />

        <div class="space-y-3">
          <p
            class="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"
          >
            <UIcon name="i-heroicons-server" />
            Configure these nameservers:
          </p>

          <div class="space-y-2 p-1">
            <div
              v-for="ns in [
                'hydrogen.ns.hetzner.com',
                'oxygen.ns.hetzner.com',
                'helium.ns.hetzner.de',
              ]"
              :key="ns"
              class="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 font-mono text-sm"
            >
              <span>{{ ns }}</span>
              <UButton
                icon="i-heroicons-clipboard-document"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="copyToClipboard(ns)"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const validatedDomain = ref<null | { domain: string; status: any }>(null);

function onDomainValidated(payload: { domain: string; status: any }) {
  validatedDomain.value = payload;
}

function onSubscribeClicked(payload: any) {
  console.log("Subscribe clicked:", payload);
}
</script>
