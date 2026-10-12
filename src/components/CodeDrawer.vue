<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy, Check, Download, Code2, Sparkles } from 'lucide-vue-next';
import { generateExportCode } from '../services/codeGenerator';
import type { ExportFormat } from '../types';

const props = defineProps<{
  optimizedSvgText: string;
  fileName: string;
}>();

const activeFormat = ref<ExportFormat>('react');
const isCopied = ref(false);

const codeOutput = computed(() => {
  const componentName = props.fileName
    .replace(/\.svg$/i, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('') || 'SvgIcon';

  return generateExportCode(props.optimizedSvgText, activeFormat.value, componentName);
});

async function copyCode() {
  await navigator.clipboard.writeText(codeOutput.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
}

function downloadSingleSvg() {
  const blob = new Blob([props.optimizedSvgText], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = props.fileName.replace(/\.svg$/i, '') + '-clean.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
</script>

<template>
  <div class="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-velvet-900/80 backdrop-blur-xl p-6 shadow-card-soft space-y-4">
    <!-- Format Tabs Header -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        <Code2 class="w-4 h-4 text-azure-500" /> 1-Click Code Export
      </div>

      <div class="flex items-center bg-slate-100 dark:bg-velvet-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
        <button
          type="button"
          v-for="fmt in (['react', 'vue', 'svelte', 'raw', 'datauri'] as ExportFormat[])"
          :key="fmt"
          @click="activeFormat = fmt"
          class="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg transition-all duration-150 uppercase"
          :class="activeFormat === fmt 
            ? 'bg-white dark:bg-slate-700 text-azure-600 dark:text-azure-300 shadow-sm ring-1 ring-slate-900/5' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          {{ fmt }}
        </button>
      </div>
    </div>

    <!-- Code Display Box with syntax contrast -->
    <div class="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 shadow-inner group">
      <pre class="text-xs font-mono text-emerald-300 overflow-x-auto max-h-56 scrollbar-thin"><code>{{ codeOutput }}</code></pre>
    </div>

    <!-- Friendly Action Buttons -->
    <div class="flex items-center space-x-3 pt-1">
      <button
        type="button"
        @click="copyCode"
        class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all duration-200 shadow-md"
        :class="isCopied 
          ? 'bg-emerald-600 text-white shadow-emerald-500/25 scale-[1.02]' 
          : 'bg-gradient-to-r from-emerald-500 to-spring-500 hover:from-emerald-600 hover:to-spring-600 text-white shadow-emerald-500/20 active:scale-[0.99]'"
      >
        <Check v-if="isCopied" class="w-4 h-4" />
        <Copy v-else class="w-4 h-4" />
        <span>{{ isCopied ? 'Copied to Clipboard!' : 'Copy Code' }}</span>
      </button>

      <button
        type="button"
        @click="downloadSingleSvg"
        class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-velvet-800 dark:hover:bg-velvet-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all duration-200 shadow-sm hover:shadow"
      >
        <Download class="w-4 h-4 text-azure-500" />
        <span>Download Clean SVG</span>
      </button>
    </div>
  </div>
</template>
