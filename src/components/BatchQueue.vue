<script setup lang="ts">
import { FileArchive, CheckCircle2, AlertCircle, Trash2, ArrowRight } from 'lucide-vue-next';
import type { QueueItem } from '../types';

defineProps<{
  queue: QueueItem[];
  totalOriginalSize: number;
  totalOptimizedSize: number;
  totalSavingsPercentage: number;
}>();

defineEmits<{
  (e: 'downloadZip'): void;
  (e: 'clearQueue'): void;
  (e: 'selectItem', item: QueueItem): void;
}>();
</script>

<template>
  <div class="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-velvet-900/80 backdrop-blur-xl p-6 sm:p-7 shadow-card-soft space-y-6">
    <!-- Header with Aggregated Savings Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
      <div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Batch Drop Queue</span>
          <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-azure-50 dark:bg-azure-950/60 text-azure-700 dark:text-azure-400 border border-azure-200 dark:border-azure-800 font-bold">
            {{ queue.length }} files
          </span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Parallel multi-file optimization with instant client-side ZIP packaging
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center space-x-3">
        <button
          type="button"
          @click="$emit('clearQueue')"
          class="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>

        <button
          type="button"
          @click="$emit('downloadZip')"
          class="flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-azure-500 to-spring-500 hover:from-azure-600 hover:to-spring-600 shadow-md shadow-azure-500/20 active:scale-[0.98] transition-all"
        >
          <FileArchive class="w-4 h-4" />
          <span>Download All (.zip)</span>
        </button>
      </div>
    </div>

    <!-- Aggregate Stats Strip: Warm Creative Pastel Gradient -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-spring-50 via-azure-50 to-lavender-50 dark:from-spring-950/30 dark:via-azure-950/30 dark:to-lavender-950/30 border border-azure-200/80 dark:border-azure-800/50">
      <div>
        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Original Total</p>
        <p class="text-base font-bold font-mono text-slate-900 dark:text-white">
          {{ (totalOriginalSize / 1024).toFixed(2) }} KB
        </p>
      </div>
      <div>
        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Cleaned Total</p>
        <p class="text-base font-bold font-mono text-emerald-600 dark:text-spring-400">
          {{ (totalOptimizedSize / 1024).toFixed(2) }} KB
        </p>
      </div>
      <div>
        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Total Bandwidth Saved</p>
        <p class="text-base font-black font-mono bg-gradient-to-r from-emerald-600 to-azure-600 dark:from-spring-400 dark:to-azure-400 bg-clip-text text-transparent">
          -{{ totalSavingsPercentage }}%
        </p>
      </div>
    </div>

    <!-- Items List Table -->
    <div class="space-y-2 max-h-[420px] overflow-y-auto pr-1">
      <div
        v-for="item in queue"
        :key="item.id"
        @click="$emit('selectItem', item)"
        class="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-azure-300 dark:hover:border-azure-600 bg-slate-50/70 dark:bg-velvet-850 hover:bg-white dark:hover:bg-velvet-800 cursor-pointer transition-all duration-150 group shadow-sm"
      >
        <div class="flex items-center space-x-3 truncate pr-4">
          <div class="w-8 h-8 rounded-xl bg-white dark:bg-velvet-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
            <CheckCircle2 v-if="item.status === 'done'" class="w-4 h-4 text-emerald-500" />
            <AlertCircle v-else class="w-4 h-4 text-rose-500" />
          </div>
          <div class="truncate">
            <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-azure-600 dark:group-hover:text-azure-400 transition-colors">
              {{ item.name }}
            </p>
            <p class="text-[11px] font-mono text-slate-500">
              {{ (item.originalSize / 1024).toFixed(2) }} KB → <strong class="text-emerald-600 dark:text-spring-400">{{ ((item.optimizedSize || item.originalSize) / 1024).toFixed(2) }} KB</strong>
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-3 shrink-0">
          <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            -{{ item.savingsPercentage }}%
          </span>
          <ArrowRight class="w-4 h-4 text-slate-400 group-hover:text-azure-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  </div>
</template>
