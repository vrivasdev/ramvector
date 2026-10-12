<script setup lang="ts">
import { ToggleLeft, ToggleRight, Settings2 } from 'lucide-vue-next';
import type { OptimizerConfig } from '../types';

defineProps<{
  config: OptimizerConfig;
}>();

const emit = defineEmits<{
  (e: 'updateConfig', key: keyof OptimizerConfig, value: boolean): void;
}>();
</script>

<template>
  <div class="rounded-xl border border-obsidian-700 bg-obsidian-900 p-5 shadow-xl space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-xs font-mono text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
        <Settings2 class="w-3.5 h-3.5 text-cyber-emerald" /> Optimization Plugins
      </span>
    </div>

    <div class="space-y-2.5">
      <!-- Toggle Item -->
      <div
        @click="emit('updateConfig', 'removeComments', !config.removeComments)"
        class="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-800/60 hover:bg-obsidian-800 border border-obsidian-700/50 cursor-pointer transition-colors"
      >
        <div>
          <p class="text-xs font-medium text-slate-200">Remove Comments</p>
          <p class="text-[10px] text-slate-500 font-mono">Strip XML comments & metadata</p>
        </div>
        <component
          :is="config.removeComments ? ToggleRight : ToggleLeft"
          class="w-6 h-6 transition-colors"
          :class="config.removeComments ? 'text-cyber-emerald' : 'text-slate-600'"
        />
      </div>

      <!-- Toggle Item -->
      <div
        @click="emit('updateConfig', 'stripEditorCruft', !config.stripEditorCruft)"
        class="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-800/60 hover:bg-obsidian-800 border border-obsidian-700/50 cursor-pointer transition-colors"
      >
        <div>
          <p class="text-xs font-medium text-slate-200">Strip Editor Cruft</p>
          <p class="text-[10px] text-slate-500 font-mono">Remove Figma & Illustrator XML data</p>
        </div>
        <component
          :is="config.stripEditorCruft ? ToggleRight : ToggleLeft"
          class="w-6 h-6 transition-colors"
          :class="config.stripEditorCruft ? 'text-cyber-emerald' : 'text-slate-600'"
        />
      </div>

      <!-- Toggle Item -->
      <div
        @click="emit('updateConfig', 'purgeScriptsAndEvents', !config.purgeScriptsAndEvents)"
        class="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-800/60 hover:bg-obsidian-800 border border-obsidian-700/50 cursor-pointer transition-colors"
      >
        <div>
          <p class="text-xs font-medium text-slate-200">Security Sanitizer</p>
          <p class="text-[10px] text-slate-500 font-mono">Purge malicious scripts & inline JS</p>
        </div>
        <component
          :is="config.purgeScriptsAndEvents ? ToggleRight : ToggleLeft"
          class="w-6 h-6 transition-colors"
          :class="config.purgeScriptsAndEvents ? 'text-cyber-emerald' : 'text-slate-600'"
        />
      </div>

      <!-- Toggle Item -->
      <div
        @click="emit('updateConfig', 'multipass', !config.multipass)"
        class="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-800/60 hover:bg-obsidian-800 border border-obsidian-700/50 cursor-pointer transition-colors"
      >
        <div>
          <p class="text-xs font-medium text-slate-200">Multipass Compression</p>
          <p class="text-[10px] text-slate-500 font-mono">Run recursive optimization passes</p>
        </div>
        <component
          :is="config.multipass ? ToggleRight : ToggleLeft"
          class="w-6 h-6 transition-colors"
          :class="config.multipass ? 'text-cyber-emerald' : 'text-slate-600'"
        />
      </div>
    </div>
  </div>
</template>
