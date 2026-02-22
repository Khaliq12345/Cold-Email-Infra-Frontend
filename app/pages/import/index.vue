<template>
  <div class="mx-auto py-8 space-y-6">
    <!-- Header -->
    <DomainsImportHeader />

    <!-- Step 1 -->
    <DomainsImportForm v-model:is-valid="isValid" v-model:domains="domains" />

    <DomainsImportInstruction
      :domains="domains"
      :is-valid="isValid"
    ></DomainsImportInstruction>
  </div>
</template>

<script lang="ts" setup>
const isValid = ref<boolean>(false);
const domains = ref<string[]>([]);
</script>
