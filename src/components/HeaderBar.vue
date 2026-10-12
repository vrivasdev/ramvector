<script setup lang="ts">
import { ShieldCheck, Github, Zap, Sun, Moon } from 'lucide-vue-next';

defineProps<{
  activeMode: 'studio' | 'batch';
  isDarkMode: boolean;
}>();

defineEmits<{
  (e: 'update:activeMode', mode: 'studio' | 'batch'): void;
  (e: 'toggleTheme'): void;
}>();
</script>

<template>
  <header class="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-velvet-900/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- Logo & Brand Identity -->
      <div class="flex items-center space-x-3.5">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-spring-500 via-azure-500 to-lavender-500 flex items-center justify-center shadow-md shadow-azure-500/20">
          <Zap class="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            Ram<span class="bg-gradient-to-r from-spring-600 to-azure-500 bg-clip-text text-transparent">Vector</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-spring-50 dark:bg-spring-500/10 text-spring-700 dark:text-spring-400 border border-spring-200 dark:border-spring-500/30 uppercase tracking-widest font-semibold">WASM</span>
          </span>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5">100% In-RAM Micro SVG Optimizer</p>
        </div>
      </div>

      <!-- Mode Switcher (Studio vs Batch) -->
      <div class="flex items-center bg-slate-100/90 dark:bg-velvet-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
        <button
          type="button"
          @click="$emit('update:activeMode', 'studio')"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150"
          :class="activeMode === 'studio' 
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          Studio Inspector
        </button>
        <button
          type="button"
          @click="$emit('update:activeMode', 'batch')"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150"
          :class="activeMode === 'batch' 
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          Batch Drop Queue
        </button>
      </div>

      <!-- Controls & Privacy Badge -->
      <div class="flex items-center space-x-3">
        <!-- Privacy Badge -->
        <div class="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-full shadow-sm">
          <ShieldCheck class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>RAM Private (Zero Uploads)</span>
        </div>

        <!-- Light / Dark Theme Switcher -->
        <button
          type="button"
          @click="$emit('toggleTheme')"
          class="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-velvet-800 hover:bg-slate-200 dark:hover:bg-velvet-700 border border-slate-200/80 dark:border-slate-700/60 transition-all duration-150 shadow-sm"
          :title="isDarkMode ? 'Switch to Fresh Light Theme' : 'Switch to Soft Dark Theme'"
        >
          <Sun v-if="isDarkMode" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-600" />
        </button>

        <!-- GitHub Link -->
        <a
          href="https://github.com/vrivasdev/ramvector"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-velvet-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="GitHub Repository"
        >
          <Github class="w-4 h-4" />
        </a>
      </div>
    </div>
  </header>
</template>
