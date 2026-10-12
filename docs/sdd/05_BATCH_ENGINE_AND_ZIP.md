# SDD-05: Batch Engine & In-RAM ZIP Packaging

## 1. Concurrency Model
- Parallel worker pool leveraging `navigator.hardwareConcurrency` (capped between 2 and 8 concurrent worker threads).
- FIFO queue handling up to 50+ SVGs dropped simultaneously.
- Real-time progress bar and state badge per card (`Pending`, `Optimizing`, `Optimized`, `Error`).

## 2. In-Memory Packaging (`fflate`)
- Asynchronous compression avoiding main thread lockup.
- Creates `ramvector-optimized-assets.zip` containing all processed SVGs named with their original filename (or optional `-min.svg` suffix).
- Zero server roundtrips; Blob generated in RAM and downloaded using native browser anchor `download` trigger.
