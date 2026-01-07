<template>
  <div class="flex items-center text-xs sm:text-sm gap-1">
    <UDropdownMenu :items="sections">
      <UButton variant="ghost" trailing-icon="i-lucide-chevron-down" size="xs" class="text-xs sm:text-sm">
        <span class="hidden sm:inline">{{ currentSection }}</span>
        <span class="sm:hidden">{{ currentSection.slice(0, 3) }}</span>
      </UButton>
    </UDropdownMenu>
    <span class="text-gray-400">/</span>
    <UDropdownMenu :items="subsections">
      <UButton variant="ghost" trailing-icon="i-lucide-chevron-down" size="xs" class="text-xs sm:text-sm">
        <span class="hidden sm:inline">{{ currentSubsection }}</span>
        <span class="sm:hidden">{{ currentSubsection.slice(0, 3) }}</span>
      </UButton>
    </UDropdownMenu>
  </div>
</template>
<script setup lang="ts">
const currentSection = ref("Domains");
const currentSubsection = ref("All");

const sections = [
  [
    { label: "Domains", onSelect: () => setSection("Domains") },
    { label: "Campaigns", onSelect: () => setSection("Campaigns") },
    { label: "Analytics", onSelect: () => setSection("Analytics") },
    { label: "Settings", onSelect: () => setSection("Settings") },
  ],
];

const subsectionMap = {
  Domains: [
    { label: "All", onSelect: () => setSubsection("All") },
    { label: "Domain 1", onSelect: () => setSubsection("Domain 1") },
    { label: "Domain 2", onSelect: () => setSubsection("Domain 2") },
    { label: "Domain 3", onSelect: () => setSubsection("Domain 3") },
  ],
  Campaigns: [
    { label: "Active", onSelect: () => setSubsection("Active") },
    { label: "Templates", onSelect: () => setSubsection("Templates") },
    { label: "Settings", onSelect: () => setSubsection("Settings") },
  ],
  Analytics: [
    { label: "Performance", onSelect: () => setSubsection("Performance") },
    { label: "Metrics", onSelect: () => setSubsection("Metrics") },
    { label: "Settings", onSelect: () => setSubsection("Settings") },
  ],
  Settings: [
    { label: "Profile", onSelect: () => setSubsection("Profile") },
    { label: "Security", onSelect: () => setSubsection("Security") },
    { label: "Preferences", onSelect: () => setSubsection("Preferences") },
  ],
};

const subsections = computed(() => [
  subsectionMap[currentSection.value as keyof typeof subsectionMap],
]);

function setSection(section: string) {
  currentSection.value = section;
  const sectionData = subsectionMap[section as keyof typeof subsectionMap];
  if (sectionData && sectionData[0]) {
    currentSubsection.value = sectionData[0].label;
    navigateTo(`/${section.toLowerCase()}`);
  }
}

function setSubsection(subsection: string) {
  currentSubsection.value = subsection;
  const router = useRouter()
  if(subsection === "All") {
    router.push(`/${currentSection.value.toLowerCase()}`);
  } else {
    router.push(`/${currentSection.value.toLowerCase()}/${subsection.toLowerCase()}`);
  }

}
</script>