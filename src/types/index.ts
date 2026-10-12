export interface OptimizerConfig {
  precision: number; // 0 to 5, default: 3
  removeComments: boolean;
  stripEditorCruft: boolean;
  purgeScriptsAndEvents: boolean;
  multipass: boolean;
  cleanViewBox: boolean;
  removeDimensions: boolean;
}

export interface OptimizationResult {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  savingsPercentage: number;
  optimizedSvgText: string;
  originalSvgText: string;
  durationMs: number;
  error?: string;
}

export interface QueueItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  optimizedSize?: number;
  savingsPercentage?: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  originalSvgText?: string;
  optimizedSvgText?: string;
  durationMs?: number;
  error?: string;
}

export type ExportFormat = 'raw' | 'react' | 'vue' | 'svelte' | 'datauri';
