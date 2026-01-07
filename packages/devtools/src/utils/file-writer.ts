import type { TranslationObject, TranslationFile } from "../types";

/**
 * Convert translation object to formatted JSON string
 */
export function stringifyTranslations(
  data: TranslationObject,
  indent: number = 2,
): string {
  return JSON.stringify(data, null, indent) + "\n";
}

/**
 * Download file to user's computer
 */
export function downloadFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download translation file
 */
export function downloadTranslationFile(file: TranslationFile): void {
  const content = stringifyTranslations(file.data);
  downloadFile(file.filename, content);
}

/**
 * Download multiple translation files as separate files
 */
export function downloadAllTranslations(files: TranslationFile[]): void {
  for (const file of files) {
    downloadTranslationFile(file);
  }
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

/**
 * Read file from input element
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * Load translation files from file input
 */
export async function loadTranslationFilesFromInput(
  files: FileList,
): Promise<Array<{ filename: string; content: string }>> {
  const results: Array<{ filename: string; content: string }> = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file && file.name.endsWith(".json")) {
      const content = await readFileAsText(file);
      results.push({
        filename: file.name,
        content,
      });
    }
  }

  return results;
}
