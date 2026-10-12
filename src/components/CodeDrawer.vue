<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy, Check, Download, Code2 } from 'lucide-vue-next';
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
  <div class="rounded-xl border border-obsidian-700 bg-obsidian-900 p-5 shadow-xl space-y-4">
    <!-- Format Tabs Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5 text-xs font-mono text-slate-300 uppercase tracking-wider">
        <Code2 class="w-3.5 h-3.5 text-cyber-cyan" /> 1-Click Code Export
      </div>

      <div class="flex items-center bg-obsidian-950 p-0.5 rounded-lg border border-obsidian-700">
        <button
          type="button"
          v-for="fmt in (['react', 'vue', 'svelte', 'raw', 'datauri'] as ExportFormat[])"
          :key="fmt"
          @click="activeFormat = fmt"
          class="px-2.5 py-1 text-[11px] font-mono rounded transition-colors uppercase"
          :class="activeFormat === fmt ? 'bg-cyber-emerald/20 text-cyber-emerald font-semibold border border-cyber-emerald/40' : 'text-slate-400 hover:text-white'"
        >
          {{ fmt === 'raw' ? 'SVG' : fmt }}
        </button>
      </div>
    </div>

    <!-- Code Block Preview -->
    <div class="relative rounded-lg bg-obsidian-950 border border-obsidian-800 p-3.5 max-h-48 overflow-y-auto font-mono text-xs text-slate-300">
      <pre class="whitespace-pre-wrap break-all leading-relaxed"><code>{{ codeOutput }}</code></pre>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-3 pt-1">
      <button
        type="button"
        @click="copyCode"
        class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-emerald hover:bg-cyber-emerald/90 text-obsidian-950 font-semibold text-xs transition-colors shadow-lg shadow-cyber-emerald/10 cursor-pointer"
      >
        <component :is="isCopied ? Check : Copy" class="w-4 h-4" />
        <span>{{ isCopied ? 'Copied to Clipboard!' : 'Copy Code' }}</span>
      </button>

      <button
        type="button"
        @click="downloadSingleSvg"
        class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 border border-obsidian-700 font-medium text-xs transition-colors cursor-pointer"
      >
        <Download class="w-4 h-4" />
        <span>Download SVG</span>
      </button>
    </div>
  </div>
</template>
