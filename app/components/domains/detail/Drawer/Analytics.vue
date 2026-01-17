<template>
  <CollapsibleCard
    title="Analytics"
    subtitle="Performance of warmup"
    icon="i-lucide-bar-chart-3"
    color="primary"
    :default-open="false"
  >
    <template #content>
      <!-- Health Scores -->
      <div class="p-2">
        <SectionHeader
          title="Health Scores"
          icon="i-lucide-heart-pulse"
          color="primary"
        />

        <div class="space-y-2.5">
          <MetricItem
            v-for="(item, key) in healthScoreItems"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data.health_scores[key]"
            type="health"
          />
        </div>
      </div>

      <hr class="my-1" />

      <!-- Reply Rates -->
      <div class="p-2 bg-gray-50/50 dark:bg-gray-900/30">
        <SectionHeader
          title="Reply Rates"
          icon="i-lucide-message-square"
          color="blue"
        />

        <div class="space-y-2.5">
          <MetricItem
            v-for="(item, key) in replyRateItems"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data.reply_rates[key]"
            type="percentage"
          />
        </div>
      </div>

      <hr class="my-1" />

      <!-- Daily Counters -->
      <div class="p-2">
        <SectionHeader
          title="Daily Counters"
          icon="i-lucide-calendar-days"
          color="green"
        />

        <div class="space-y-2.5">
          <MetricItem
            v-for="(item, key) in dailyCounterItems"
            :key="key"
            :label="item.label"
            :icon="item.icon"
            :value="data.daily_counters[key]"
            type="number"
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
      health_scores: {},
      reply_rates: {},
      daily_counters: {},
    }),
  },
});

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
</script>
