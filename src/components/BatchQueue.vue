<script setup lang="ts">
import { Download, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-vue-next';
import type { QueueItem } from '../types';

defineProps<{
  items: QueueItem[];
  totalOriginalSize: number;
  totalOptimizedSize: number;
  totalSavingsPercentage: number;
  isProcessing: boolean;
}>();

defineEmits<{
  (e: 'downloadZip'): void;
  (e: 'clearQueue'): void;
  (e: 'selectItem', item: QueueItem): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <!-- Queue Header Summary Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-obsidian-700 bg-obsidian-900 shadow-xl">
      <div class="flex items-center space-x-4">
        <div>
          <span class="text-xs font-mono text-slate-400">Total Queue:</span>
          <p class="text-lg font-bold font-mono text-white">
            {{ items.length }} <span class="text-xs text-slate-400 font-normal">Files</span>
          </p>
        </div>
        <div class="h-8 w-px bg-obsidian-700"></div>
        <div>
          <span class="text-xs font-mono text-slate-400">Net Compression:</span>
          <p class="text-lg font-bold font-mono text-cyber-emerald">
            -{{ totalSavingsPercentage }}%
          </p>
        </div>
        <div class="h-8 w-px bg-obsidian-700"></div>
        <div>
          <span class="text-xs font-mono text-slate-400">Size Delta:</span>
          <p class="text-xs font-mono text-slate-300 mt-1">
            {{ (totalOriginalSize / 1024).toFixed(1) }} KB → <strong class="text-cyber-emerald">{{ (totalOptimizedSize / 1024).toFixed(1) }} KB</strong>
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <button
          type="button"
          @click="$emit('downloadZip')"
          :disabled="isProcessing || items.length === 0"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-emerald hover:bg-cyber-emerald/90 disabled:opacity-50 text-obsidian-950 font-semibold text-xs transition-colors shadow-lg shadow-cyber-emerald/20 cursor-pointer"
        >
          <Download class="w-4 h-4" />
          <span>Download All (.zip)</span>
        </button>

        <button
          type="button"
          @click="$emit('clearQueue')"
          class="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-obsidian-800 border border-obsidian-700"
          title="Clear Queue"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div
        v-for="item in items"
        :key="item.id"
        @click="$emit('selectItem', item)"
        class="flex items-center justify-between p-3.5 rounded-lg border border-obsidian-700/80 bg-obsidian-900/60 hover:bg-obsidian-800/80 hover:border-slate-500 cursor-pointer transition-all duration-150"
      >
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-10 h-10 rounded-lg bg-obsidian-950 border border-obsidian-700 flex items-center justify-center p-1.5 flex-shrink-0 svg-checkerboard">
            <div v-if="item.optimizedSvgText" class="w-full h-full flex items-center justify-center" v-html="item.optimizedSvgText"></div>
            <div v-else class="text-[10px] text-slate-500 font-mono">SVG</div>
          </div>

          <div class="min-w-0">
            <p class="text-xs font-medium text-white truncate max-w-[140px]" :title="item.name">
              {{ item.name }}
            </p>
            <p class="text-[10px] font-mono text-slate-400 mt-0.5">
              {{ (item.originalSize / 1024).toFixed(1) }} KB
              <span v-if="item.optimizedSize" class="text-cyber-emerald">
                → {{ (item.optimizedSize / 1024).toFixed(1) }} KB
              </span>
            </p>
          </div>
        </div>

        <!-- Status / Savings Badge -->
        <div class="flex items-center pl-2 flex-shrink-0">
          <span
            v-if="item.status === 'done'"
            class="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 flex items-center gap-1"
          >
            <CheckCircle2 class="w-3 h-3" /> -{{ item.savingsPercentage }}%
          </span>
          <span
            v-else-if="item.status === 'processing'"
            class="text-[11px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center gap-1"
          >
            <Loader2 class="w-3 h-3 animate-spin" /> Optimizing
          </span>
          <span
            v-else-if="item.status === 'error'"
            class="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1"
          >
            <AlertCircle class="w-3 h-3" /> Error
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
