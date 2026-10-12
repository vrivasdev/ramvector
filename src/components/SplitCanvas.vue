<script setup lang="ts">
import { ref, computed } from 'vue';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-vue-next';

const props = defineProps<{
  originalSvg: string;
  optimizedSvg: string;
  originalSize: number;
  optimizedSize: number;
}>();

const splitPos = ref(50); // percentage 0 to 100
const isDragging = ref(false);
const zoom = ref(100); // 25% to 500%

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const offsetX = e.clientX - container.left;
  const percent = Math.min(Math.max((offsetX / container.width) * 100, 5), 95);
  splitPos.value = percent;
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value || !e.touches[0]) return;
  const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const offsetX = e.touches[0].clientX - container.left;
  const percent = Math.min(Math.max((offsetX / container.width) * 100, 5), 95);
  splitPos.value = percent;
}

function zoomIn() {
  if (zoom.value < 400) zoom.value += 25;
}

function zoomOut() {
  if (zoom.value > 50) zoom.value -= 25;
}

function resetZoom() {
  zoom.value = 100;
  splitPos.value = 50;
}

const zoomScaleStyle = computed(() => ({
  transform: `scale(${zoom.value / 100})`,
  transformOrigin: 'center center'
}));
</script>

<template>
  <div class="relative flex flex-col rounded-xl border border-obsidian-700 bg-obsidian-900 overflow-hidden shadow-2xl">
    <!-- Viewport Header Toolbar -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-obsidian-700/80 bg-obsidian-800/80 text-xs font-mono">
      <div class="flex items-center space-x-4">
        <span class="text-slate-400">
          BEFORE: <strong class="text-white font-medium">{{ (originalSize / 1024).toFixed(2) }} KB</strong>
        </span>
        <span class="text-slate-600">|</span>
        <span class="text-cyber-emerald">
          AFTER: <strong>{{ (optimizedSize / 1024).toFixed(2) }} KB</strong>
        </span>
      </div>

      <!-- Zoom Controls -->
      <div class="flex items-center space-x-1.5 bg-obsidian-900 px-2 py-1 rounded-md border border-obsidian-700">
        <button
          type="button"
          @click="zoomOut"
          class="p-1 hover:text-cyber-emerald text-slate-400 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut class="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          @click="resetZoom"
          class="text-[11px] font-mono px-1.5 hover:text-white text-slate-300"
          title="Reset to 100%"
        >
          {{ zoom }}%
        </button>
        <button
          type="button"
          @click="zoomIn"
          class="p-1 hover:text-cyber-emerald text-slate-400 transition-colors"
          title="Zoom In"
        >
          <ZoomIn class="w-3.5 h-3.5" />
        </button>
        <span class="text-obsidian-700">|</span>
        <button
          type="button"
          @click="resetZoom"
          class="p-1 hover:text-cyber-cyan text-slate-400 transition-colors"
          title="Reset View"
        >
          <RotateCcw class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Draggable Canvas Area -->
    <div
      class="relative h-[380px] sm:h-[460px] svg-checkerboard select-none cursor-ew-resize overflow-hidden"
      @mousedown="isDragging = true"
      @mouseup="isDragging = false"
      @mouseleave="isDragging = false"
      @mousemove="onMouseMove"
      @touchstart="isDragging = true"
      @touchend="isDragging = false"
      @touchmove="onTouchMove"
    >
      <!-- Original Layer (Left side) -->
      <div
        class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        :style="{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }"
      >
        <div
          class="w-full h-full flex items-center justify-center p-8 transition-transform duration-75"
          :style="zoomScaleStyle"
          v-html="originalSvg"
        ></div>
        <div class="absolute top-3 left-3 bg-obsidian-950/80 border border-obsidian-700 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur">
          BEFORE (Original)
        </div>
      </div>

      <!-- Optimized Layer (Right side) -->
      <div
        class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        :style="{ clipPath: `inset(0 0 0 ${splitPos}%)` }"
      >
        <div
          class="w-full h-full flex items-center justify-center p-8 transition-transform duration-75"
          :style="zoomScaleStyle"
          v-html="optimizedSvg"
        ></div>
        <div class="absolute top-3 right-3 bg-obsidian-950/80 border border-cyber-emerald/40 text-cyber-emerald text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur">
          AFTER (RAM Cleaned)
        </div>
      </div>

      <!-- Divider Split Line -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-cyber-emerald cursor-ew-resize pointer-events-none"
        :style="{ left: `${splitPos}%` }"
      >
        <!-- Center Handle Knob -->
        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-obsidian-900 border-2 border-cyber-emerald flex items-center justify-center shadow-lg shadow-cyber-emerald/30">
          <div class="flex space-x-0.5">
            <span class="w-0.5 h-3 bg-cyber-emerald rounded"></span>
            <span class="w-0.5 h-3 bg-cyber-emerald rounded"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
