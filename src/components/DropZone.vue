<script setup lang="ts">
import { ref } from 'vue';
import { UploadCloud, Sparkles, FolderUp } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'filesSelected', files: File[]): void;
}>();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

function handleDrop(e: DragEvent) {
  isDragging.value = false;
  if (!e.dataTransfer?.files?.length) return;
  const rawFiles = Array.from(e.dataTransfer.files);
  const svgFiles = rawFiles.filter(f => f.name.toLowerCase().endsWith('.svg') || f.type === 'image/svg+xml');
  if (svgFiles.length) {
    emit('filesSelected', svgFiles);
  }
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files?.length) return;
  const svgFiles = Array.from(target.files).filter(f => f.name.toLowerCase().endsWith('.svg') || f.type === 'image/svg+xml');
  if (svgFiles.length) {
    emit('filesSelected', svgFiles);
  }
  target.value = '';
}
</script>

<template>
  <div
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
    @click="fileInput?.click()"
    class="border-2 border-dashed rounded-3xl p-8 sm:p-11 text-center cursor-pointer transition-all duration-200 relative group overflow-hidden shadow-card-soft"
    :class="isDragging 
      ? 'border-spring-500 bg-spring-50/70 dark:bg-spring-950/20 scale-[1.01] shadow-glow-spring' 
      : 'border-slate-300 dark:border-slate-700/80 bg-white/70 dark:bg-velvet-900/60 hover:border-azure-400 dark:hover:border-azure-500 hover:bg-slate-50/60 dark:hover:bg-velvet-850/70 backdrop-blur-md'"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      accept=".svg,image/svg+xml"
      class="hidden"
      @change="handleFileChange"
    />

    <div class="flex flex-col items-center justify-center space-y-4">
      <!-- Joyful gradient upload icon -->
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-spring-100 via-azure-100 to-lavender-100 dark:from-spring-950/50 dark:via-azure-950/50 dark:to-lavender-950/50 border border-azure-200/80 dark:border-azure-800/60 flex items-center justify-center group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 shadow-sm">
        <UploadCloud class="w-8 h-8 text-azure-600 dark:text-azure-400" />
      </div>

      <div class="space-y-1.5">
        <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Drop SVG files here or <span class="text-azure-600 dark:text-azure-400 underline underline-offset-4 decoration-azure-300 dark:decoration-azure-600 hover:text-azure-700">browse files</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Compress paths and cleanse cruft directly inside browser RAM • Zero server latency
        </p>
      </div>

      <!-- Feature badges -->
      <div class="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-spring-50 dark:bg-spring-950/50 text-spring-700 dark:text-spring-300 border border-spring-200 dark:border-spring-800">
          <FolderUp class="w-3 h-3 text-spring-600 dark:text-spring-400" /> Multi-file Batch
        </span>
        <span class="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-azure-50 dark:bg-azure-950/50 text-azure-700 dark:text-azure-300 border border-azure-200 dark:border-azure-800">
          <Sparkles class="w-3 h-3 text-azure-600 dark:text-azure-400" /> Clean Precision Slider
        </span>
        <span class="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-coral-50 dark:bg-coral-950/50 text-coral-700 dark:text-coral-300 border border-coral-200 dark:border-coral-800">
          ⚡ 100% Free & Private
        </span>
      </div>
    </div>
  </div>
</template>
