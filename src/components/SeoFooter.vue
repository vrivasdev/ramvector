<script setup lang="ts">
import { Heart } from 'lucide-vue-next';
</script>

<template>
  <footer class="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-velvet-950/60 backdrop-blur-md py-10 mt-12 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      <!-- High-intent PSEO Quick Links -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase text-[11px] tracking-wider">Features</h4>
          <ul class="space-y-1.5 text-slate-500 dark:text-slate-400">
            <li><a href="#" class="hover:text-azure-600 transition-colors">In-Browser SVGO v3</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">Batch ZIP Processing</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">Security XSS Purge</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase text-[11px] tracking-wider">Framework Exporters</h4>
          <ul class="space-y-1.5 text-slate-500 dark:text-slate-400">
            <li><a href="#" class="hover:text-azure-600 transition-colors">SVG to React (TSX)</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">SVG to Vue 3 (SFC)</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">SVG to Svelte / Data URI</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase text-[11px] tracking-wider">Tool Cleaners</h4>
          <ul class="space-y-1.5 text-slate-500 dark:text-slate-400">
            <li><a href="#" class="hover:text-azure-600 transition-colors">Figma SVG Cruft Stripper</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">Illustrator XML Cleaner</a></li>
            <li><a href="#" class="hover:text-azure-600 transition-colors">Inkscape Metadata Minifier</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase text-[11px] tracking-wider">Privacy & Guarantee</h4>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
            100% In-RAM Execution. Your vectors never touch any remote backend, cloud queue, or analytics pipeline.
          </p>
        </div>
      </div>

      <!-- Copyright and Love note -->
      <div class="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <p>© 2026 RamVector • Built for speed, privacy, and creative joy.</p>
        <p class="flex items-center gap-1">
          Crafted with <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the modern web
        </p>
      </div>
    </div>
  </footer>
</template>
