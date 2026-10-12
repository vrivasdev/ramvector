<script setup lang="ts">
import { ArrowDownRight, Clock, HardDrive, Sparkles } from 'lucide-vue-next';

defineProps<{
  originalSize: number;
  optimizedSize: number;
  savingsPercentage: number;
  durationMs: number;
}>();
</script>

<template>
  <div class="rounded-xl border border-obsidian-700 bg-obsidian-900 p-5 shadow-xl space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles class="w-3.5 h-3.5 text-cyber-emerald" /> Optimization Metrics
      </span>
      <span class="text-[11px] font-mono text-slate-500 flex items-center gap-1">
        <Clock class="w-3 h-3" /> {{ durationMs }}ms in-RAM
      </span>
    </div>

    <!-- Main Savings Card -->
    <div class="flex items-center justify-between p-4 rounded-lg bg-obsidian-950 border border-obsidian-700/80">
      <div>
        <p class="text-xs text-slate-400 font-mono">Net Size Reduction</p>
        <div class="flex items-baseline gap-1 mt-0.5">
          <span class="text-3xl font-black font-mono tracking-tight text-cyber-emerald">
            -{{ savingsPercentage }}%
          </span>
          <span class="text-xs font-mono text-slate-400">savings</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center">
        <ArrowDownRight class="w-6 h-6 text-cyber-emerald" />
      </div>
    </div>

    <!-- Bytes Breakdown -->
    <div class="grid grid-cols-2 gap-3 pt-1">
      <div class="p-3 rounded-lg bg-obsidian-800/60 border border-obsidian-700/50">
        <span class="text-[10px] font-mono text-slate-400 flex items-center gap-1 uppercase">
          <HardDrive class="w-3 h-3 text-slate-500" /> Original
        </span>
        <p class="text-base font-bold font-mono text-white mt-1">
          {{ (originalSize / 1024).toFixed(2) }} <span class="text-xs font-normal text-slate-400">KB</span>
        </p>
        <p class="text-[10px] font-mono text-slate-500">{{ originalSize }} bytes</p>
      </div>

      <div class="p-3 rounded-lg bg-cyber-emerald/5 border border-cyber-emerald/20">
        <span class="text-[10px] font-mono text-cyber-emerald flex items-center gap-1 uppercase">
          <Sparkles class="w-3 h-3" /> Optimized
        </span>
        <p class="text-base font-bold font-mono text-cyber-emerald mt-1">
          {{ (optimizedSize / 1024).toFixed(2) }} <span class="text-xs font-normal text-cyber-emerald/70">KB</span>
        </p>
        <p class="text-[10px] font-mono text-slate-500">{{ optimizedSize }} bytes</p>
      </div>
    </div>
  </div>
</template>
