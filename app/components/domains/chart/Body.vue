<template>
  <div class="w-full">
    <!-- dropdowns div -->
    <div class="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-4">
      <!-- date range -->
      <UDropdownMenu :items="[rangechoice]">
        <UButton
          variant="ghost"
          trailing-icon="i-lucide-chevron-down"
          size="sm"
        >
          {{ currentrange }}
        </UButton>
      </UDropdownMenu>

      <UDropdownMenu :items="[domainchoice]">
        <UButton
          variant="ghost"
          trailing-icon="i-lucide-chevron-down"
          size="sm"
        >
          {{ currentdomain }}
        </UButton>
      </UDropdownMenu>
    </div>

    <!-- mini h-list div -->
    <div class="w-full flex gap-2 overflow-hidden mb-4">
      <div class="flex gap-2 text-nowrap overflow-x-scroll">
        <div
          v-for="domain in domainsList"
          class="flex items-center gap-1 sm:gap-2 shrink-0"
        >
          <p
            class="w-3 h-3 sm:w-4 sm:h-1 rounded"
            :style="{ backgroundColor: domain.color }"
          ></p>
          <p class="text-xs sm:text-sm">{{ domain.name }}</p>
        </div>
      </div>
    </div>
    <!-- chart div -->
    <div class="p-1 sm:p-2">
      <AreaChart
        :data="data"
        :categories="categories"
        category-axis="date"
        :colors="domainsList.map((domain) => domain.color)"
        :height="250"
        :y-step="50"
        :smooth="true"
        :show-tooltips="true"
        class="w-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

const currentrange = ref("Last 7 days");
const rangechoice = [
  {
    label: "Last 7 days",
    onSelect: () => (currentrange.value = "Last 7 days"),
  },
  {
    label: "Last 30 days",
    onSelect: () => (currentrange.value = "Last 30 days"),
  },
  {
    label: "Last 90 days",
    onSelect: () => (currentrange.value = "Last 90 days"),
  },
];

const currentdomain = ref("All Domains");
const domainchoice = [
  {
    label: "All Domains",
    onSelect: () => (currentdomain.value = "All Domains"),
  },
  { label: "Domain 1", onSelect: () => (currentdomain.value = "Domain 1") },
  { label: "Domain 2", onSelect: () => (currentdomain.value = "Domain 2") },
];

const domainsList = [
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
const categories = computed(() =>
  Object.fromEntries(
    domainsList.map((d) => [
      d.value.split(".")[0],
      { name: d.name, color: d.color },
    ]),
  ),
);

const data = ref([
  {
    date: "2024-04-01",
    domain1: 75,
    domain2: 55,
    domain3: 90,
    domain4: 60,
    domain5: 80,
    domain6: 70,
    domain7: 65,
    domain8: 85,
    domain9: 95,
    domain10: 110,
    domain11: 50,
    domain12: 45,
    domain13: 78,
    domain14: 88,
    domain15: 92,
    domain16: 66,
    domain17: 74,
    domain18: 83,
    domain19: 58,
    domain20: 99,
  },
  {
    date: "2024-04-02",
    domain1: 125,
    domain2: 95,
    domain3: 130,
    domain4: 100,
    domain5: 120,
    domain6: 110,
    domain7: 105,
    domain8: 135,
    domain9: 145,
    domain10: 160,
    domain11: 90,
    domain12: 85,
    domain13: 118,
    domain14: 128,
    domain15: 132,
    domain16: 106,
    domain17: 114,
    domain18: 123,
    domain19: 98,
    domain20: 149,
  },
  {
    date: "2024-04-03",
    domain1: 167,
    domain2: 140,
    domain3: 160,
    domain4: 150,
    domain5: 170,
    domain6: 165,
    domain7: 155,
    domain8: 175,
    domain9: 185,
    domain10: 200,
    domain11: 135,
    domain12: 130,
    domain13: 158,
    domain14: 168,
    domain15: 172,
    domain16: 146,
    domain17: 154,
    domain18: 163,
    domain19: 138,
    domain20: 189,
  },
  {
    date: "2024-04-04",
    domain1: 260,
    domain2: 200,
    domain3: 220,
    domain4: 210,
    domain5: 230,
    domain6: 225,
    domain7: 215,
    domain8: 235,
    domain9: 245,
    domain10: 270,
    domain11: 195,
    domain12: 190,
    domain13: 218,
    domain14: 228,
    domain15: 232,
    domain16: 206,
    domain17: 214,
    domain18: 223,
    domain19: 198,
    domain20: 249,
  },
  {
    date: "2024-04-05",
    domain1: 240,
    domain2: 210,
    domain3: 260,
    domain4: 230,
    domain5: 250,
    domain6: 245,
    domain7: 235,
    domain8: 255,
    domain9: 265,
    domain10: 290,
    domain11: 205,
    domain12: 200,
    domain13: 238,
    domain14: 248,
    domain15: 252,
    domain16: 226,
    domain17: 234,
    domain18: 243,
    domain19: 218,
    domain20: 269,
  },
]);
</script>

<style></style>
