<template>
  <div class="flex items-center text-sm">
    <UDropdownMenu :items="sections">
      <UButton variant="ghost" trailing-icon="i-lucide-chevron-down">
        {{ currentSection }}
      </UButton>
    </UDropdownMenu>
    <p>/</p>
    <UDropdownMenu :items="subsections">
      <UButton variant="ghost" trailing-icon="i-lucide-chevron-down">
        {{ currentSubsection }}
      </UButton>
    </UDropdownMenu>
  </div>
</template>
<script setup lang="ts">
const currentSection = ref("Dashboard");
const currentSubsection = ref("Overview");

const sections = [
  [
    { label: "Dashboard", onSelect: () => setSection("Dashboard") },
    { label: "Campaigns", onSelect: () => setSection("Campaigns") },
    { label: "Analytics", onSelect: () => setSection("Analytics") },
    { label: "Settings", onSelect: () => setSection("Settings") },
  ],
];

const subsectionMap = {
  Dashboard: [
    { label: "Overview", onSelect: () => setSubsection("Overview") },
    { label: "Reports", onSelect: () => setSubsection("Reports") },
    { label: "Settings", onSelect: () => setSubsection("Settings") },
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
  }
}

function setSubsection(subsection: string) {
  currentSubsection.value = subsection;
}
</script>