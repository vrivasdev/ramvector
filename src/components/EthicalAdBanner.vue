<script setup lang="ts">
import { Sparkles, Shield, Heart } from 'lucide-vue-next';
</script>

<template>
  <div class="w-full rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-velvet-900/60 backdrop-blur-xl p-6 min-h-[105px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card-soft">
    <!-- Ad container -->
    <div class="flex items-center space-x-3.5">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-100 to-lavender-100 dark:from-coral-950/40 dark:to-lavender-950/40 border border-coral-200 dark:border-coral-800 flex items-center justify-center text-coral-500 shadow-sm shrink-0">
        <Sparkles class="w-5 h-5" />
      </div>
      <div>
        <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Developer Sponsor</span>
        <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Supercharge your vector workflows with privacy-first developer tools.
        </p>
      </div>
    </div>

    <!-- Privacy friendly badge -->
    <div class="flex items-center space-x-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-velvet-800 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/60 shrink-0">
      <Shield class="w-3.5 h-3.5 text-azure-500" />
      <span>Ethical Developer Ad • Zero Tracking</span>
    </div>
  </div>
</template>
