<template>
  <div
    class="flex flex-col md:grid md:grid-cols-2 md:items-center w-full gap-4"
  >
    <p class="text-sm font-medium truncate leading-none justify-self-start">
      {{ item.item.value.email }}
    </p>

    <div class="flex md:justify-end gap-2">
      <span
        :class="
          item.item.value.health > 98 ? 'text-emerald-500' : 'text-amber-500'
        "
        class="text-sm font-semibold"
      >
        {{ item.item.value.health }}%
      </span>

      <span
        class="h-2 w-2 rounded-full"
        :class="{
          'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]':
            item.item.value.status === 'ready',
          'bg-blue-500 animate-pulse': item.item.value.status === 'warming',
          'bg-amber-500': item.item.value.status === 'pending',
          'bg-rose-500': item.item.value.status === 'failed',
        }"
      ></span>
      <span class="uppercase tracking-widest font-bold text-gray-500">
        {{ item.item.value.status }}
      </span>

      <span class="font-medium text-gray-700">{{
        item.item.value.warmup_days
      }}</span>
      <span class="uppercase font-bold">days</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: object;
}>();
</script>
