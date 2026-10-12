<script setup lang="ts">
import { ref, computed } from 'vue';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-vue-next';

const props = defineProps<{
  originalSvg: string;
  optimizedSvg: string;
  originalSize: number;
  optimizedSize: number;
  isDarkMode: boolean;
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
  <div class="relative flex flex-col rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-velvet-900 overflow-hidden shadow-card-soft">
    <!-- Viewport Header Toolbar -->
    <div class="flex items-center justify-between px-5 py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-velvet-850/70 backdrop-blur-md text-xs font-mono">
      <div class="flex items-center space-x-3 sm:space-x-4">
        <span class="text-slate-500 dark:text-slate-400">
          BEFORE: <strong class="text-slate-800 dark:text-slate-200 font-semibold">{{ (originalSize / 1024).toFixed(2) }} KB</strong>
        </span>
        <span class="text-slate-300 dark:text-slate-700">|</span>
        <span class="text-emerald-600 dark:text-spring-400">
          AFTER: <strong class="font-bold">{{ (optimizedSize / 1024).toFixed(2) }} KB</strong>
        </span>
      </div>

      <!-- Zoom Controls -->
      <div class="flex items-center space-x-1 bg-white dark:bg-velvet-900 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <button
          type="button"
          @click="zoomOut"
          class="p-1 hover:text-azure-600 text-slate-500 dark:text-slate-400 transition-colors"
          title="Zoom out"
        >
          <ZoomOut class="w-3.5 h-3.5" />
        </button>
        <span class="px-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 min-w-[36px] text-center">
          {{ zoom }}%
        </span>
        <button
          type="button"
          @click="zoomIn"
          class="p-1 hover:text-azure-600 text-slate-500 dark:text-slate-400 transition-colors"
          title="Zoom in"
        >
          <ZoomIn class="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          @click="resetZoom"
          class="p-1 hover:text-azure-600 text-slate-500 dark:text-slate-400 transition-colors ml-0.5 border-l border-slate-200 dark:border-slate-700"
          title="Reset View"
        >
          <RotateCcw class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Dual Split Canvas Viewport -->
    <div
      class="relative w-full h-[400px] sm:h-[460px] select-none cursor-ew-resize overflow-hidden"
      :class="isDarkMode ? 'svg-checkerboard-dark' : 'svg-checkerboard-light'"
      @mousedown="isDragging = true"
      @mouseup="isDragging = false"
      @mouseleave="isDragging = false"
      @mousemove="onMouseMove"
      @touchstart="isDragging = true"
      @touchend="isDragging = false"
      @touchmove="onTouchMove"
    >
      <!-- Optimized (Background Right Side) -->
      <div
        class="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-75 pointer-events-none"
        :style="zoomScaleStyle"
      >
        <div
          class="w-full h-full max-w-[320px] max-h-[320px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain drop-shadow-md"
          v-html="optimizedSvg"
        ></div>
      </div>

      <!-- Original (Clipped Foreground Left Side) -->
      <div
        class="absolute inset-0 overflow-hidden border-r border-transparent pointer-events-none"
        :style="{ width: splitPos + '%' }"
      >
        <div
          class="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-75"
          :style="{
            ...zoomScaleStyle,
            width: (100 / (splitPos / 100)) + '%'
          }"
        >
          <div
            class="w-full h-full max-w-[320px] max-h-[320px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain drop-shadow-md opacity-90"
            v-html="originalSvg"
          ></div>
        </div>
      </div>

      <!-- Draggable Split Divider Line & Handle -->
      <div
        class="absolute top-0 bottom-0 pointer-events-none flex flex-col items-center justify-center -ml-[1.5px]"
        :style="{ left: splitPos + '%' }"
      >
        <!-- Vertical colorful accent line -->
        <div class="w-[3px] h-full bg-gradient-to-b from-spring-400 via-azure-400 to-lavender-400 shadow-sm"></div>

        <!-- Center Handle -->
        <div class="absolute w-8 h-8 rounded-full bg-white dark:bg-velvet-800 border-2 border-azure-400 flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
          <div class="flex space-x-0.5">
            <div class="w-0.5 h-3 bg-azure-500 rounded-full"></div>
            <div class="w-0.5 h-3 bg-azure-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Left / Right Floating Tags -->
      <div class="absolute bottom-3 left-3 pointer-events-none">
        <span class="text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-slate-900/60 text-white backdrop-blur-sm border border-white/20">
          BEFORE (Original)
        </span>
      </div>
      <div class="absolute bottom-3 right-3 pointer-events-none">
        <span class="text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-spring-600/90 text-white backdrop-blur-sm shadow-sm">
          AFTER (Cleaned)
        </span>
      </div>
    </div>
  </div>
</template>
