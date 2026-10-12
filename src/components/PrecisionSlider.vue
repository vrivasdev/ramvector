<script setup lang="ts">
import { Sliders } from 'lucide-vue-next';

defineProps<{
  modelValue: number;
}>();

defineEmits<{
  (e: 'update:modelValue', val: number): void;
}>();
</script>

<template>
  <div class="rounded-xl border border-obsidian-700 bg-obsidian-900 p-5 shadow-xl space-y-3">
    <div class="flex items-center justify-between">
      <label for="precision-slider" class="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
        <Sliders class="w-3.5 h-3.5 text-cyber-cyan" /> Coordinate Precision
      </label>
      <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
        {{ modelValue }} Decimals
      </span>
    </div>

    <div>
      <input
        id="precision-slider"
        type="range"
        min="0"
        max="5"
        step="1"
        :value="modelValue"
        @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-cyber-emerald"
      />
      <div class="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5 px-0.5">
        <span>0 (Compact)</span>
        <span>1</span>
        <span>2</span>
        <span>3 (Default)</span>
        <span>4</span>
        <span>5 (Max)</span>
      </div>
    </div>
  </div>
</template>
