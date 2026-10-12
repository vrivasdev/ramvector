<script setup lang="ts">
import { ToggleLeft, ToggleRight, Sparkles } from 'lucide-vue-next';
import type { OptimizerConfig } from '../types';

defineProps<{
  config: OptimizerConfig;
}>();

const emit = defineEmits<{
  (e: 'toggle', key: keyof OptimizerConfig, val: boolean): void;
}>();

const toggles: { key: keyof OptimizerConfig; label: string; desc: string }[] = [
  { key: 'multipass', label: 'Multipass Compression', desc: 'Run recursive optimization passes for minimal bytes' },
  { key: 'removeComments', label: 'Purge XML Comments', desc: 'Strip design software author credits and metadata' },
  { key: 'cleanupIds', label: 'Minify / Clean Element IDs', desc: 'Shorten or remove redundant SVG anchor IDs' },
  { key: 'convertColors', label: 'Color Hex Optimization', desc: 'Convert RGB/named colors into shortest 3-digit hex' },
  { key: 'removeViewBox', label: 'Preserve ViewBox Scale', desc: 'Maintain responsive scaling viewBox definition' },
  { key: 'convertPathData', label: 'Path Data Rounding', desc: 'Snap curve segments to chosen decimal precision' }
];
</script>

<template>
  <div class="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-velvet-900/80 backdrop-blur-xl p-6 shadow-card-soft space-y-4">
    <div class="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
      <span class="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles class="w-4 h-4 text-lavender-500" /> Optimization Filters
      </span>
      <span class="text-[11px] font-mono text-slate-400">SVGO v3 Engine</span>
    </div>

    <div class="space-y-3 pt-1">
      <div
        v-for="item in toggles"
        :key="item.key"
        @click="emit('toggle', item.key, !config[item.key])"
        class="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-velvet-850/80 cursor-pointer transition-colors duration-150 select-none group border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700/60"
      >
        <div class="space-y-0.5 pr-2">
          <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-azure-600 dark:group-hover:text-azure-400 transition-colors">
            {{ item.label }}
          </p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            {{ item.desc }}
          </p>
        </div>

        <button
          type="button"
          class="text-xl transition-transform duration-150"
          :class="config[item.key] ? 'text-spring-500' : 'text-slate-300 dark:text-slate-600'"
        >
          <ToggleRight v-if="config[item.key]" class="w-7 h-7" />
          <ToggleLeft v-else class="w-7 h-7" />
        </button>
      </div>
    </div>
  </div>
</template>
