<template>
  <UCard
    :ui="{
      root: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
      body: 'p-0',
      divide: 'divide-y-0',
    }"
  >
    <!-- Header avec bouton collapsible -->
    <UCollapsible v-model:open="isOpen" class="w-full">
      <template #default>
        <div
          class="flex items-center justify-between p-2 cursor-pointer rounded-t-lg transition-colors"
          :class="
            isOpen
              ? 'bg-gray-100/60 dark:bg-gray-900/40'
              : 'hover:bg-gray-50 dark:hover:bg-gray-900'
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              :class="
                isOpen
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              "
            >
              <UIcon name="i-lucide-settings" class="w-5 h-5" />
            </div>
            <div>
              <h3
                class="font-semibold text-gray-900 dark:text-gray-100 text-sm"
              >
                Warmup Configuration
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Settings of warmup
              </p>
            </div>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-lucide-chevron-down"
            :ui="{
              icon:
                'transition-transform duration-200' +
                (isOpen ? ' rotate-180' : ''),
            }"
            @click.stop
          />
        </div>
      </template>

      <!-- Contenu -->
      <template #content>
        <div class="border-t border-gray-200 dark:border-gray-800">
          <!-- Paramètres principaux -->
          <div class="p-2">
            <div class="space-y-3">
              <div
                v-for="(item, key) in mainSettings"
                :key="key"
                class="flex items-center justify-between group"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="item.icon"
                    class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    item.label
                  }}</span>
                </div>
                <UButton
                  v-if="item.type === 'boolean'"
                  size="xs"
                  :color="data[key] ? 'success' : 'neutral'"
                  :label="data[key] ? 'Oui' : 'Non'"
                  :ui="{
                    font: 'font-semibold text-xs',
                    padding: { xs: 'px-3 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
                <UButton
                  v-else-if="item.type === 'number'"
                  size="xs"
                  color="primary"
                  :label="formatNumber(data[key])"
                  :ui="{
                    font: 'font-mono font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
                <span
                  v-else
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ data[key] }}
                </span>
              </div>
            </div>
          </div>

          <hr class="my-1" />

          <!-- Paramètres avancés -->
          <div class="p-2 bg-purple-50/50 dark:bg-purple-900/20">
            <div class="flex items-center gap-2 mb-3">
              <UIcon
                name="i-lucide-sliders-horizontal"
                class="w-4 h-4 text-purple-500"
              />
              <h4
                class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              >
                Advanced Settings
              </h4>
            </div>
            <div class="space-y-2.5 pl-1">
              <div
                v-for="(item, key) in advancedSettings"
                :key="key"
                class="flex items-center justify-between group"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="item.icon"
                    class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    item.label
                  }}</span>
                </div>
                <UButton
                  v-if="item.type === 'boolean'"
                  size="xs"
                  :color="data.advanced[key] ? 'success' : 'neutral'"
                  :label="data.advanced[key] ? 'Oui' : 'Non'"
                  :ui="{
                    font: 'font-semibold text-xs',
                    padding: { xs: 'px-3 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
                <UButton
                  v-else
                  size="xs"
                  color="info"
                  :label="data.advanced[key]"
                  :ui="{
                    font: 'font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
              </div>
            </div>
          </div>

          <hr class="my-1" />

          <!-- Performance -->
          <div class="p-2">
            <div class="flex items-center gap-2 mb-3">
              <UIcon
                name="i-lucide-trending-up"
                class="w-4 h-4 text-green-500"
              />
              <h4
                class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              >
                Performance
              </h4>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="(item, key) in performanceSettings"
                :key="key"
                class="flex items-center justify-between group"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="item.icon"
                    class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    item.label
                  }}</span>
                </div>
                <UButton
                  v-if="item.type === 'percentage'"
                  size="xs"
                  color="success"
                  :label="formatPercentage(data[key])"
                  :ui="{
                    font: 'font-mono font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
                <UButton
                  v-else
                  size="xs"
                  color="success"
                  :label="formatNumber(data[key])"
                  :ui="{
                    font: 'font-mono font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </UCollapsible>
  </UCard>
</template>

<script setup>
import { ref } from "vue";

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

const isOpen = ref(false);

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

// Fonctions utilitaires
function formatNumber(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseInt(value);
  if (isNaN(num)) return value;
  return num.toLocaleString();
}

function formatPercentage(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${num.toFixed(1)}%`;
}
</script>
