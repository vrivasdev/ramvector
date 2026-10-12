<script setup lang="ts">
import { ShieldCheck, Github, Zap } from 'lucide-vue-next';

defineProps<{
  activeMode: 'studio' | 'batch';
}>();

defineEmits<{
  (e: 'update:activeMode', mode: 'studio' | 'batch'): void;
}>();
</script>

<template>
  <header class="border-b border-obsidian-700/60 bg-obsidian-900/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-cyber-emerald to-cyber-cyan flex items-center justify-center shadow-lg shadow-cyber-emerald/20">
          <Zap class="w-5 h-5 text-obsidian-950 fill-obsidian-950" />
        </div>
        <div>
          <span class="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            Ram<span class="text-cyber-emerald">Vector</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 uppercase tracking-widest">WASM</span>
          </span>
          <p class="text-[10px] text-slate-400 font-mono -mt-0.5">100% In-RAM Micro SVG Optimizer</p>
        </div>
      </div>

      <!-- Mode Switcher -->
      <div class="flex items-center bg-obsidian-800 p-1 rounded-lg border border-obsidian-700">
        <button
          type="button"
          @click="$emit('update:activeMode', 'studio')"
          class="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
          :class="activeMode === 'studio' ? 'bg-cyber-emerald text-obsidian-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'"
        >
          Studio Inspector
        </button>
        <button
          type="button"
          @click="$emit('update:activeMode', 'batch')"
          class="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
          :class="activeMode === 'batch' ? 'bg-cyber-emerald text-obsidian-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'"
        >
          Batch Drop Queue
        </button>
      </div>

      <!-- Privacy Badge & Links -->
      <div class="flex items-center space-x-4">
        <div class="hidden sm:flex items-center space-x-2 text-xs font-mono text-cyber-emerald bg-cyber-emerald/10 border border-cyber-emerald/30 px-2.5 py-1 rounded-full">
          <ShieldCheck class="w-3.5 h-3.5" />
          <span>RAM Private (Zero Server Uploads)</span>
        </div>
        <a
          href="https://github.com/vrivasdev/ramvector"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-obsidian-800"
          title="GitHub Repository"
        >
          <Github class="w-5 h-5" />
        </a>
      </div>
    </div>
  </header>
</template>
