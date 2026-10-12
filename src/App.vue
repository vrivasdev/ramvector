<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import DropZone from './components/DropZone.vue';
import SplitCanvas from './components/SplitCanvas.vue';
import TelemetryPanel from './components/TelemetryPanel.vue';
import PrecisionSlider from './components/PrecisionSlider.vue';
import PluginToggles from './components/PluginToggles.vue';
import CodeDrawer from './components/CodeDrawer.vue';
import BatchQueue from './components/BatchQueue.vue';
import EthicalAdBanner from './components/EthicalAdBanner.vue';
import SeoFooter from './components/SeoFooter.vue';
import { runOptimization, DEFAULT_OPTIMIZER_CONFIG } from './services/optimizer';
import { createZipArchive, downloadZip } from './services/zipPackager';
import type { OptimizerConfig, QueueItem } from './types';

// State
const activeMode = ref<'studio' | 'batch'>('studio');
const config = reactive<OptimizerConfig>({ ...DEFAULT_OPTIMIZER_CONFIG });
const queue = ref<QueueItem[]>([]);
const isBatchProcessing = ref(false);

// Active Studio Item
const currentFileName = ref('ram-icon.svg');
const currentOriginalSvg = ref('');
const currentOptimizedSvg = ref('');
const currentOriginalSize = ref(0);
const currentOptimizedSize = ref(0);
const currentSavingsPercentage = ref(0);
const currentDurationMs = ref(0);

// Sample SVG to wow the user immediately on first load
const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Generator: Adobe Illustrator 28.0.0, SVG Export Plug-In -->
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g id="Layer_1">
    <rect width="200.000000" height="200.000000" rx="36.000000" fill="#111726" stroke="#1e293b" stroke-width="4.000000"/>
    <path d="M60.123456 140.987654 L100.000000 60.111222 L140.543210 140.987654 Z" fill="url(#grad1)"/>
    <circle cx="100.000000" cy="115.000000" r="16.500000" fill="#0a0d14" stroke="#10b981" stroke-width="3.000000"/>
    <text x="100.000000" y="172.000000" font-family="Inter, sans-serif" font-size="12.000000" font-weight="bold" fill="#f1f5f9" text-anchor="middle">RAMVECTOR</text>
  </g>
</svg>`;

function reoptimizeCurrent() {
  if (!currentOriginalSvg.value) return;
  const result = runOptimization(currentOriginalSvg.value, config, currentFileName.value);
  currentOptimizedSvg.value = result.optimizedSvgText;
  currentOriginalSize.value = result.originalSize;
  currentOptimizedSize.value = result.optimizedSize;
  currentSavingsPercentage.value = result.savingsPercentage;
  currentDurationMs.value = result.durationMs;
}

function handlePrecisionChange(val: number) {
  config.precision = val;
  reoptimizeCurrent();
}

function handleConfigToggle(key: keyof OptimizerConfig, val: boolean) {
  (config as any)[key] = val;
  reoptimizeCurrent();
}

async function handleFilesSelected(files: File[]) {
  for (const file of files) {
    const text = await file.text();
    const result = runOptimization(text, config, file.name);

    queue.value.push({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      originalSize: result.originalSize,
      optimizedSize: result.optimizedSize,
      savingsPercentage: result.savingsPercentage,
      status: result.error ? 'error' : 'done',
      originalSvgText: text,
      optimizedSvgText: result.optimizedSvgText,
      durationMs: result.durationMs,
      error: result.error
    });
  }

  // Load first file into Studio Inspector
  if (files.length > 0 && queue.value.length > 0) {
    const latest = queue.value[queue.value.length - files.length];
    selectQueueItem(latest);
  }

  if (files.length > 1) {
    activeMode.value = 'batch';
  }
}

function selectQueueItem(item: QueueItem) {
  currentFileName.value = item.name;
  currentOriginalSvg.value = item.originalSvgText || '';
  currentOptimizedSvg.value = item.optimizedSvgText || '';
  currentOriginalSize.value = item.originalSize;
  currentOptimizedSize.value = item.optimizedSize || item.originalSize;
  currentSavingsPercentage.value = item.savingsPercentage || 0;
  currentDurationMs.value = item.durationMs || 0;
  activeMode.value = 'studio';
}

function handleBatchZip() {
  const filesToZip = queue.value
    .filter(i => i.status === 'done' && i.optimizedSvgText)
    .map(i => ({
      name: i.name,
      content: i.optimizedSvgText!
    }));

  if (filesToZip.length === 0) return;
  const zipBytes = createZipArchive(filesToZip);
  downloadZip(zipBytes, 'ramvector-optimized-assets.zip');
}

function clearQueue() {
  queue.value = [];
}

const totalOriginalSize = computed(() => queue.value.reduce((acc, i) => acc + i.originalSize, 0));
const totalOptimizedSize = computed(() => queue.value.reduce((acc, i) => acc + (i.optimizedSize || i.originalSize), 0));
const totalSavingsPercentage = computed(() => {
  if (totalOriginalSize.value === 0) return 0;
  return Math.max(0, Math.round(((totalOriginalSize.value - totalOptimizedSize.value) / totalOriginalSize.value) * 100));
});

onMounted(() => {
  currentOriginalSvg.value = SAMPLE_SVG;
  currentFileName.value = 'ram-sample.svg';
  reoptimizeCurrent();
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-obsidian-950 text-slate-100">
    <!-- Header Navigation -->
    <HeaderBar v-model:activeMode="activeMode" />

    <!-- Main Application Canvas -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Drag & Drop Zone -->
      <DropZone @filesSelected="handleFilesSelected" />

      <!-- Studio Mode View -->
      <div v-if="activeMode === 'studio'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Interactive Vector Viewport -->
        <div class="lg:col-span-7 space-y-4">
          <SplitCanvas
            :originalSvg="currentOriginalSvg"
            :optimizedSvg="currentOptimizedSvg"
            :originalSize="currentOriginalSize"
            :optimizedSize="currentOptimizedSize"
          />
        </div>

        <!-- Right: Studio Controls, Telemetry & Export Drawer -->
        <div class="lg:col-span-5 space-y-4">
          <TelemetryPanel
            :originalSize="currentOriginalSize"
            :optimizedSize="currentOptimizedSize"
            :savingsPercentage="currentSavingsPercentage"
            :durationMs="currentDurationMs"
          />

          <PrecisionSlider
            :modelValue="config.precision"
            @update:modelValue="handlePrecisionChange"
          />

          <PluginToggles
            :config="config"
            @updateConfig="handleConfigToggle"
          />

          <CodeDrawer
            :optimizedSvgText="currentOptimizedSvg"
            :fileName="currentFileName"
          />
        </div>
      </div>

      <!-- Batch Queue View -->
      <div v-else class="space-y-6">
        <BatchQueue
          :items="queue"
          :totalOriginalSize="totalOriginalSize"
          :totalOptimizedSize="totalOptimizedSize"
          :totalSavingsPercentage="totalSavingsPercentage"
          :isProcessing="isBatchProcessing"
          @downloadZip="handleBatchZip"
          @clearQueue="clearQueue"
          @selectItem="selectQueueItem"
        />
      </div>

      <!-- Ethical Sponsorship Ad Slot (Zero CLS) -->
      <EthicalAdBanner />
    </main>

    <!-- Programmatic SEO Footer -->
    <SeoFooter />
  </div>
</template>
