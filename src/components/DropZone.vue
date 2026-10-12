<script setup lang="ts">
import { ref } from 'vue';
import { UploadCloud, FileCode2 } from 'lucide-vue-next';

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
    class="border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 relative group overflow-hidden"
    :class="isDragging ? 'border-cyber-emerald bg-cyber-emerald/10 shadow-lg shadow-cyber-emerald/10' : 'border-obsidian-700 bg-obsidian-900/60 hover:border-slate-500 hover:bg-obsidian-900'"
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
      <div class="w-16 h-16 rounded-2xl bg-obsidian-800 border border-obsidian-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <UploadCloud class="w-8 h-8 text-cyber-emerald" />
      </div>

      <div class="space-y-1">
        <h3 class="text-base sm:text-lg font-semibold text-white tracking-tight">
          Drop SVG files here or <span class="text-cyber-emerald underline underline-offset-4 decoration-cyber-emerald/40 hover:decoration-cyber-emerald">browse files</span>
        </h3>
        <p class="text-xs text-slate-400 font-mono">
          Compress paths directly inside browser RAM • Zero server latency
        </p>
      </div>

      <div class="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-500">
        <span class="flex items-center gap-1">
          <FileCode2 class="w-3.5 h-3.5 text-cyber-cyan" /> Multi-file Batch
        </span>
        <span>•</span>
        <span>Drag & Drop 50+ files</span>
        <span>•</span>
        <span>Figma & Illustrator Cruft Stripping</span>
      </div>
    </div>
  </div>
</template>
