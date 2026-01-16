<template>
  <UCard
    :ui="{
      root: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
      body: 'p-0',
      divide: 'divide-y-0',
    }"
  >
    <!-- Header avec bouton collapsible -->
    <UCollapsible v-model:open="isOpen" class="w-full" label="Analytics">
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
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              "
            >
              <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5" />
            </div>
            <div>
              <h3
                class="font-semibold text-gray-900 dark:text-gray-100 text-sm"
              >
                Analytics
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Performance of warmup
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
          <!-- Health Scores -->
          <div class="p-2">
            <div class="flex items-center gap-2 mb-3">
              <UIcon
                name="i-lucide-heart-pulse"
                class="w-4 h-4 text-primary-500"
              />
              <h4
                class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              >
                Health Scores
              </h4>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="(item, key) in healthScoreItems"
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
                  size="xs"
                  :color="getHealthColor(data.health_scores[key])"
                  :label="formatValue(data.health_scores[key])"
                  :ui="{
                    font: 'font-mono font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
              </div>
            </div>
          </div>

          <h class="my-1" />

          <!-- Reply Rates -->
          <div class="p-2 bg-gray-50/50 dark:bg-gray-900/30">
            <div class="flex items-center gap-2 mb-3">
              <UIcon
                name="i-lucide-message-square"
                class="w-4 h-4 text-blue-500"
              />
              <h4
                class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              >
                Reply Rates
              </h4>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="(item, key) in replyRateItems"
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
                  size="xs"
                  color="info"
                  :label="formatPercentage(data.reply_rates[key])"
                  :ui="{
                    font: 'font-mono font-semibold text-xs',
                    padding: { xs: 'px-2 py-0.5' },
                  }"
                  class="min-w-[3rem] justify-center"
                />
              </div>
            </div>
          </div>

          <hr class="my-1" />

          <!-- Daily Counters -->
          <div class="p-2">
            <div class="flex items-center gap-2 mb-3">
              <UIcon
                name="i-lucide-calendar-days"
                class="w-4 h-4 text-green-500"
              />
              <h4
                class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
              >
                Daily Counters
              </h4>
            </div>
            <div class="space-y-2.5">
              <div
                v-for="(item, key) in dailyCounterItems"
                :key="key"
                class="flex items-center justify-between group"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="item.icon"
                    class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    {{ item.label }}
                  </span>
                </div>
                <UButton
                  size="xs"
                  color="success"
                  :label="formatNumber(data.daily_counters[key])"
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
import { computed, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      health_scores: {},
      reply_rates: {},
      daily_counters: {},
    }),
  },
});

const isOpen = ref(false);

// Mapping des données avec icônes
const healthScoreItems = {
  "7d_overall_warmup_health": { label: "7d Overall", icon: "i-lucide-heart" },
  "7d_google_warmup_health": { label: "7d Google", icon: "i-lucide-award" },
  "7d_microsoft_warmup_health": {
    label: "7d Microsoft",
    icon: "i-lucide-building-2",
  },
  "7d_other_warmup_health": { label: "7d Other", icon: "i-lucide-users" },
  "1d_miss_warmup_rate": {
    label: "1d Miss Rate",
    icon: "i-lucide-trending-down",
  },
  "3d_bounce_rate": { label: "3d Bounce Rate", icon: "i-lucide-activity" },
};

const replyRateItems = {
  "7d_ooo_replyrate": { label: "7d OOO", icon: "i-lucide-briefcase" },
  "7d_replyrate": { label: "7d Reply", icon: "i-lucide-message-circle" },
};

const dailyCounterItems = {
  email_sent_today: { label: "Emails Sent Today", icon: "i-lucide-send" },
  warmup_email_sent_today: { label: "Warmup Sent Today", icon: "i-lucide-zap" },
};

// Fonctions utilitaires
function formatValue(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${Math.round(num)}`;
}

function formatPercentage(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return `${num.toFixed(1)}%`;
}

function formatNumber(value) {
  if (value === undefined || value === null) return "N/A";
  const num = parseInt(value);
  if (isNaN(num)) return value;
  return `${num.toLocaleString()}`;
}

// Détermine la couleur selon le score de santé
function getHealthColor(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return "neutral";

  if (num >= 90) return "success";
  if (num >= 70) return "warning";
  return "error";
}
</script>
