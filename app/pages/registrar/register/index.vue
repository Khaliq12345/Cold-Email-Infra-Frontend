<template>
  <UContainer
    class="md:max-w-3xl lg:max-w-4xl md:mx-auto p-2 sm:p-4 lg:p-6 space-y-4 flex flex-col"
  >
    <DomainsRegisterHeader />
  </UContainer>

  <div>
    <DomainsRegisterForm
      class="w-full flex flex-col items-center justify-center p-8"
    />
  </div>

  <div class="mt-10 sm:p-6 lg:p-8 md:max-w-3xl lg:max-w-4xl md:mx-auto">
    <DomainsRegisterResult />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
