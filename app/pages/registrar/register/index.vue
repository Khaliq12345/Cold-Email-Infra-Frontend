<template>
  <UContainer
    class="md:max-w-3xl lg:max-w-4xl md:mx-auto p-2 sm:p-4 lg:p-6 space-y-4 flex flex-col"
  >
    <DomainsRegisterHeader />
  </UContainer>

  <div>
    <DomainsRegisterForm
    :is-searching="isSearching"
    @submit="checkDomains"
      class="w-full flex flex-col items-center justify-center p-8"
    />
  </div>

  <div class="mt-10 sm:p-6 lg:p-8 md:max-w-3xl lg:max-w-4xl md:mx-auto">
    <DomainsRegisterResult 
      :search-result="result" 
      :has-error="hasError"
      :error-message="errorMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DomainSearchResult } from '~/types/domain';

const toast = useToast();
const isSearching = ref(false)
const result = ref<DomainSearchResult | null>(null)
const hasError = ref(false)
const errorMessage = ref('')

async function checkDomains(name: string) {
  try {
    isSearching.value = true
    hasError.value = false
    const response = await useApi(`/domains/query/${name}`)
    result.value = response as DomainSearchResult
  } catch (error) {
    hasError.value = true
    errorMessage.value = `The domain ${name} is not available`
    result.value = null
    toast.add({
      title: 'Error',
      description: `The domain ${name} is not available`,
      color: 'error',
    })
  } finally {
    isSearching.value = false
  }
}
</script>

<style></style>
