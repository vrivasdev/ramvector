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

// Theme state (Default to Fresh Luminous Light Theme)
const isDarkMode = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('ramvector_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('ramvector_theme', 'light');
  }
}

// Navigation & Config
const activeMode = ref<'studio' | 'batch'>('studio');
const config = reactive<OptimizerConfig>({ ...DEFAULT_OPTIMIZER_CONFIG });
const queue = ref<QueueItem[]>([]);
const isBatchProcessing = ref(false);

// Active Studio Item
const currentFileName = ref('hummingbird-creative.svg');
const currentOriginalSvg = ref('');
const currentOptimizedSvg = ref('');
const currentOriginalSize = ref(0);
const currentOptimizedSize = ref(0);
const currentSavingsPercentage = ref(0);
const currentDurationMs = ref(0);

// Fresh, colorful, and peaceful hummingbird vector illustration
const CREATIVE_HUMMINGBIRD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
  <!-- Generator: RamVector Creative Studio Suite -->
  <defs>
    <linearGradient id="wingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="40%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="60%" stop-color="#fb923c" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0284c7" flood-opacity="0.22" />
    </filter>
  </defs>

  <!-- Ambient background aura halo -->
  <circle cx="160.000000" cy="160.000000" r="140.000000" fill="url(#wingGrad1)" opacity="0.08" />
  <circle cx="160.000000" cy="160.000000" r="110.000000" fill="url(#bodyGrad)" opacity="0.06" />

  <g id="Hummingbird_Art" filter="url(#softGlow)">
    <!-- Feather Tail Splashes -->
    <path d="M 120.000000 230.000000 C 105.123456 265.456789 80.987654 285.345678 60.000000 295.000000 C 75.000000 270.000000 95.000000 240.000000 135.000000 215.000000 Z" fill="url(#tailGrad)" />
    <path d="M 130.000000 225.000000 C 120.000000 260.000000 100.000000 280.000000 85.000000 290.000000 C 100.000000 265.000000 115.000000 240.000000 145.000000 210.000000 Z" fill="#fb923c" opacity="0.9" />

    <!-- Main Spread Wing Feathers -->
    <path d="M 165.000000 145.000000 C 150.000000 100.000000 110.000000 65.000000 50.000000 45.000000 C 85.000000 75.000000 115.000000 110.000000 135.000000 155.000000 Z" fill="url(#wingGrad1)" />
    <path d="M 175.000000 150.000000 C 165.000000 115.000000 135.000000 85.000000 80.000000 68.000000 C 110.000000 95.000000 135.000000 125.000000 150.000000 162.000000 Z" fill="#818cf8" opacity="0.85" />
    <path d="M 185.000000 155.000000 C 180.000000 130.000000 155.000000 105.000000 110.000000 90.000000 C 135.000000 115.000000 155.000000 140.000000 165.000000 170.000000 Z" fill="#c084fc" opacity="0.8" />

    <!-- Hummingbird Body & Breast -->
    <path d="M 160.000000 140.000000 C 185.000000 130.000000 215.000000 140.000000 230.000000 165.000000 C 240.000000 180.000000 235.000000 205.000000 210.000000 220.000000 C 185.000000 235.000000 150.000000 225.000000 135.000000 200.000000 C 130.000000 180.000000 140.000000 150.000000 160.000000 140.000000 Z" fill="url(#bodyGrad)" />

    <!-- Head & Crest -->
    <circle cx="215.000000" cy="130.000000" r="22.000000" fill="#0ea5e9" />
    <path d="M 225.000000 115.000000 C 235.000000 105.000000 240.000000 95.000000 245.000000 85.000000 C 238.000000 98.000000 230.000000 108.000000 215.000000 112.000000 Z" fill="#38bdf8" />

    <!-- Slender Beak -->
    <path d="M 233.000000 128.000000 L 290.000000 125.000000 L 234.000000 133.000000 Z" fill="#0369a1" />

    <!-- Sparkle Eye -->
    <circle cx="222.000000" cy="127.000000" r="3.500000" fill="#ffffff" />
    <circle cx="223.000000" cy="126.000000" r="1.200000" fill="#0f172a" />
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
  const savedTheme = localStorage.getItem('ramvector_theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
  }

  currentOriginalSvg.value = CREATIVE_HUMMINGBIRD_SVG;
  currentFileName.value = 'hummingbird-creative.svg';
  reoptimizeCurrent();
});
</script>

<template>
  <div 
    class="min-h-screen flex flex-col transition-colors duration-300"
    :class="isDarkMode ? 'luminous-bg-dark text-slate-100' : 'luminous-bg-light text-slate-800'"
  >
    <!-- Header Navigation Bar -->
    <HeaderBar 
      v-model:activeMode="activeMode" 
      :isDarkMode="isDarkMode"
      @toggleTheme="toggleTheme"
    />

    <!-- Main Interactive Studio Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Drag & Drop Upload Zone -->
      <DropZone @filesSelected="handleFilesSelected" />

      <!-- Studio Mode View -->
      <div v-if="activeMode === 'studio'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Interactive Vector Viewport Canvas -->
        <div class="lg:col-span-7 space-y-5">
          <SplitCanvas
            :originalSvg="currentOriginalSvg"
            :optimizedSvg="currentOptimizedSvg"
            :originalSize="currentOriginalSize"
            :optimizedSize="currentOptimizedSize"
            :isDarkMode="isDarkMode"
          />

          <!-- 1-Click Code Exporter Drawer -->
          <CodeDrawer
            :optimizedSvgText="currentOptimizedSvg"
            :fileName="currentFileName"
          />
        </div>

        <!-- Right: Control Panel & Telemetry HUD -->
        <div class="lg:col-span-5 space-y-5">
          <TelemetryPanel
            :originalSize="currentOriginalSize"
            :optimizedSize="currentOptimizedSize"
            :savingsPercentage="currentSavingsPercentage"
            :durationMs="currentDurationMs"
          />

          <PrecisionSlider
            v-model="config.precision"
            @update:modelValue="handlePrecisionChange"
          />

          <PluginToggles
            :config="config"
            @toggle="handleConfigToggle"
          />
        </div>
      </div>

      <!-- Batch Mode View -->
      <div v-else class="space-y-6">
        <BatchQueue
          :queue="queue"
          :totalOriginalSize="totalOriginalSize"
          :totalOptimizedSize="totalOptimizedSize"
          :totalSavingsPercentage="totalSavingsPercentage"
          @downloadZip="handleBatchZip"
          @clearQueue="clearQueue"
          @selectItem="selectQueueItem"
        />
      </div>

      <!-- Privacy-Friendly Ethical Ads Banner -->
      <EthicalAdBanner />
    </main>

    <!-- SEO & Footer -->
    <SeoFooter />
  </div>
</template>
