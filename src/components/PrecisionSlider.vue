<script setup lang="ts">
import { Sliders } from 'lucide-vue-next';

defineProps<{
  modelValue: number;
}>();

defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();
</script>

<template>
  <div class="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-velvet-900/80 backdrop-blur-xl p-6 shadow-card-soft space-y-4">
    <div class="flex items-center justify-between">
      <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <Sliders class="w-4 h-4 text-azure-500" /> Coordinate Precision
      </label>
      <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-azure-50 dark:bg-azure-950/60 text-azure-700 dark:text-azure-400 border border-azure-200 dark:border-azure-800">
        {{ modelValue }} Decimals
      </span>
    </div>

    <!-- Range slider -->
    <div class="space-y-2">
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        :value="modelValue"
        @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-slate-200 dark:bg-velvet-800 rounded-lg appearance-none cursor-pointer accent-azure-500"
      />
      <div class="flex justify-between text-[11px] font-mono text-slate-400">
        <span>0 (Compact)</span>
        <span>1</span>
        <span>2</span>
        <span class="font-bold text-azure-600 dark:text-azure-400">3 (Default)</span>
        <span>4</span>
        <span>5 (Max)</span>
      </div>
    </div>
  </div>
</template>
