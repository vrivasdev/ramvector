import { zipSync, strToU8 } from 'fflate';

export interface FileToZip {
  name: string;
  content: string;
}

export function createZipArchive(files: FileToZip[]): Uint8Array {
  const zipData: Record<string, Uint8Array> = {};

  for (const file of files) {
    let filename = file.name;
    if (!filename.toLowerCase().endsWith('.svg')) {
      filename += '.svg';
    }
    zipData[filename] = strToU8(file.content);
  }

  return zipSync(zipData, { level: 6 });
}

export function downloadZip(zipBytes: Uint8Array, archiveName = 'ramvector-optimized.zip'): void {
  const blob = new Blob([zipBytes as unknown as BlobPart], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = archiveName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
