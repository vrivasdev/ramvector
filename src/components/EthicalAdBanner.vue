<script setup lang="ts">
import { ExternalLink, Heart } from 'lucide-vue-next';
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
    <div class="min-h-[80px] rounded-xl border border-obsidian-700/60 bg-obsidian-900/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center text-cyber-emerald flex-shrink-0">
          <Heart class="w-4 h-4 fill-cyber-emerald/20" />
        </div>
        <div>
          <span class="text-white font-medium">Free, private developer tool supported by ethical sponsorships.</span>
          <p class="text-slate-400 font-mono text-[11px] mt-0.5">
            Zero tracking cookies • Zero server uploads • 100% in-browser RAM execution
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3 flex-shrink-0">
        <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest border border-slate-700 px-1.5 py-0.5 rounded">
          Sponsor
        </span>
        <a
          href="https://github.com/vrivasdev/ramvector"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-cyber-emerald hover:underline font-mono text-xs"
        >
          <span>Star on GitHub</span>
          <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
</template>
