<template>
  <CollapsibleCard
    title="Warmup Configuration"
    subtitle="Settings of warmup"
    icon="i-lucide-settings"
    color="purple"
    :default-open="false"
  >
    <template #content>
      <!-- Paramètres principaux -->
      <div class="p-2">
        <div class="space-y-3">
          <MetricItem
            v-for="(item, key) in mainSettings"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data[key]"
            :type="item.type"
            :boolean-labels="{ true: 'Oui', false: 'Non' }"
          />
        </div>
      </div>

      <hr class="my-1" />

      <!-- Paramètres avancés -->
      <div class="p-2 bg-purple-50/50 dark:bg-purple-900/20">
        <SectionHeader
          title="Advanced Settings"
          icon="i-lucide-sliders-horizontal"
          color="purple"
        />

        <div class="space-y-2.5 pl-1">
          <MetricItem
            v-for="(item, key) in advancedSettings"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data.advanced[key]"
            :type="item.type"
            :boolean-labels="{ true: 'Oui', false: 'Non' }"
          />
        </div>
      </div>

      <hr class="my-1" />

      <!-- Performance -->
      <div class="p-2">
        <SectionHeader
          title="Performance"
          icon="i-lucide-trending-up"
          color="green"
        />

        <div class="space-y-2.5">
          <MetricItem
            v-for="(item, key) in performanceSettings"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data[key]"
            :type="item.type"
          />
        </div>
      </div>
    </template>
  </CollapsibleCard>
</template>

<script setup>
import CollapsibleCard from "./shared/CollapsibleCard.vue";
import SectionHeader from "./shared/SectionHeader.vue";
import MetricItem from "./shared/MetricItem.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      limit: 0,
      warmup_custom_words: false,
      warmup_signature: false,
      advanced: {
        warm_ctd: false,
        weekday_only: false,
        warmup_business_type: "standard",
      },
      increment: 0,
      reply_rate: 0,
    }),
  },
});

// Mapping des paramètres avec icônes
const mainSettings = {
  limit: {
    label: "Limite journalière",
    icon: "i-lucide-gauge",
    type: "number",
  },
  warmup_custom_words: {
    label: "Mots personnalisés",
    icon: "i-lucide-file-text",
    type: "boolean",
  },
  warmup_signature: {
    label: "Signature incluse",
    icon: "i-lucide-signature",
    type: "boolean",
  },
};

const advancedSettings = {
  warm_ctd: {
    label: "Warm CTD activé",
    icon: "i-lucide-flame",
    type: "boolean",
  },
  weekday_only: {
    label: "Jours ouvrés uniquement",
    icon: "i-lucide-calendar-days",
    type: "boolean",
  },
  warmup_business_type: {
    label: "Type de business",
    icon: "i-lucide-briefcase",
    type: "text",
  },
};

const performanceSettings = {
  increment: {
    label: "Incrémentation",
    icon: "i-lucide-arrow-up-circle",
    type: "number",
  },
  reply_rate: {
    label: "Taux de réponse",
    icon: "i-lucide-message-circle",
    type: "percentage",
  },
};
</script>
