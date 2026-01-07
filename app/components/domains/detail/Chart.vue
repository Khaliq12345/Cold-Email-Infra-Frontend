<template>
  <div>
    <AreaChart
      :data="chartData"
      :categories="{ emails: { name: 'Emails Sent', color: '#3B82F6' } }"
      category-axis="date"
      :colors="['#3B82F6']"
      :height="200"
      :y-step="20"
      :smooth="true"
      :show-tooltips="true"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
const chartData = ref([
  { date: '2024-01-15', emails: 45 },
  { date: '2024-01-16', emails: 62 },
  { date: '2024-01-17', emails: 38 },
  { date: '2024-01-18', emails: 71 },
  { date: '2024-01-19', emails: 55 },
  { date: '2024-01-20', emails: 89 },
  { date: '2024-01-21', emails: 67 }
])
</script>