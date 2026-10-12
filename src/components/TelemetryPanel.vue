<script setup lang="ts">
import { ArrowDownRight, Clock, HardDrive, Sparkles, Heart } from 'lucide-vue-next';

defineProps<{
  originalSize: number;
  optimizedSize: number;
  savingsPercentage: number;
  durationMs: number;
}>();
</script>

<template>
  <div class="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-velvet-900/80 backdrop-blur-xl p-6 shadow-card-soft space-y-5">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles class="w-4 h-4 text-spring-500" /> Live Optimization Metrics
      </span>
      <span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-velvet-800 text-slate-600 dark:text-slate-400 flex items-center gap-1 border border-slate-200 dark:border-slate-700">
        <Clock class="w-3 h-3 text-azure-500" /> {{ durationMs }}ms in-RAM
      </span>
    </div>

    <!-- Main Savings Card: Joyful Warm Gradient Badge -->
    <div class="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-spring-50 via-azure-50 to-lavender-50 dark:from-spring-950/30 dark:via-azure-950/30 dark:to-lavender-950/30 border border-spring-200/80 dark:border-spring-800/50 shadow-sm">
      <div>
        <p class="text-xs text-slate-600 dark:text-slate-400 font-medium">Net Size Reduction</p>
        <div class="flex items-baseline gap-1.5 mt-0.5">
          <span class="text-4xl font-black font-mono tracking-tight bg-gradient-to-r from-emerald-600 to-azure-600 dark:from-spring-400 dark:to-azure-400 bg-clip-text text-transparent">
            -{{ savingsPercentage }}%
          </span>
          <span class="text-xs font-semibold text-emerald-700 dark:text-spring-400">lighter</span>
        </div>
      </div>
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-azure-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
        <ArrowDownRight class="w-7 h-7" />
      </div>
    </div>

    <!-- Bytes Breakdown Cards -->
    <div class="grid grid-cols-2 gap-3.5 pt-1">
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-velvet-850 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <span class="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase">
          <HardDrive class="w-3.5 h-3.5 text-slate-400" /> Original
        </span>
        <p class="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
          {{ (originalSize / 1024).toFixed(2) }} <span class="text-xs font-normal text-slate-500">KB</span>
        </p>
        <p class="text-[11px] font-mono text-slate-400">{{ originalSize }} bytes</p>
      </div>

      <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-spring-950/30 border border-emerald-200 dark:border-spring-800/60 shadow-sm">
        <span class="text-[11px] font-medium text-emerald-700 dark:text-spring-400 flex items-center gap-1.5 uppercase">
          <Heart class="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> Cleaned
        </span>
        <p class="text-lg font-bold font-mono text-emerald-700 dark:text-spring-300 mt-1">
          {{ (optimizedSize / 1024).toFixed(2) }} <span class="text-xs font-normal text-emerald-600/70">KB</span>
        </p>
        <p class="text-[11px] font-mono text-emerald-600/80 dark:text-spring-400/80">{{ optimizedSize }} bytes</p>
      </div>
    </div>
  </div>
</template>
