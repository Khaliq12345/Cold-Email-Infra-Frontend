<template>
  <div class="p-2 sm:p-4 lg:p-6">
    <div class="grid grid-cols-1 gap-6">
      <UContainer>
        <DomainsCard :domains-list="domainsList" />
        <DomainsList :domains-list="domainsList" />
      </UContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

const domainsList: DomainList = [
  { name: "Domain 1", value: "domain1.com", color: "#FF5733" },
  { name: "Domain 2", value: "domain2.com", color: "#33FF57" },
  { name: "Domain 3", value: "domain3.com", color: "#3357FF" },
  { name: "Domain 4", value: "domain4.com", color: "#FF33A8" },
  { name: "Domain 5", value: "domain5.com", color: "#A833FF" },
  { name: "Domain 6", value: "domain6.com", color: "#33FFF3" },
  { name: "Domain 7", value: "domain7.com", color: "#FF8F33" },
  { name: "Domain 8", value: "domain8.com", color: "#8FFF33" },
  { name: "Domain 9", value: "domain9.com", color: "#338FFF" },
  { name: "Domain 10", value: "domain10.com", color: "#FF3333" },
  { name: "Domain 11", value: "domain11.com", color: "#33FF99" },
  { name: "Domain 12", value: "domain12.com", color: "#9933FF" },
  { name: "Domain 13", value: "domain13.com", color: "#FF3399" },
  { name: "Domain 14", value: "domain14.com", color: "#33FFCC" },
  { name: "Domain 15", value: "domain15.com", color: "#FFCC33" },
  { name: "Domain 16", value: "domain16.com", color: "#CCFF33" },
  { name: "Domain 17", value: "domain17.com", color: "#33CCFF" },
  { name: "Domain 18", value: "domain18.com", color: "#FF6633" },
  { name: "Domain 19", value: "domain19.com", color: "#66FF33" },
  { name: "Domain 20", value: "domain20.com", color: "#3366FF" },
];
</script>

<style></style>
