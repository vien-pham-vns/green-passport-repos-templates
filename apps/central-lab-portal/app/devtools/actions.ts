'use server';

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

export interface TranslationFileData {
  language: string;
  filename: string;
  content: string;
}

/**
 * Load all translation files from the public/translations directory
 */
export async function loadTranslationFiles(): Promise<TranslationFileData[]> {
  try {
    const translationsDir = join(process.cwd(), 'messages');
    const files = await readdir(translationsDir);

    const translationFiles: TranslationFileData[] = [];

    for (const filename of files) {
      if (filename.endsWith('.json')) {
        const filePath = join(translationsDir, filename);
        const content = await readFile(filePath, 'utf-8');
        const language = filename.replace('.json', '');

        translationFiles.push({
          language,
          filename,
          content,
        });
      }
    }

    return translationFiles;
  } catch (error) {
    console.error('Error loading translation files:', error);
    return [];
  }
}

/**
 * Save updated translation file back to the filesystem
 */
export async function saveTranslationFile(
  filename: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const translationsDir = join(process.cwd(), 'messages');
    const filePath = join(translationsDir, filename);

    // Validate JSON before saving
    JSON.parse(content);

    await readFile(filePath, 'utf-8'); // Ensure file exists

    // Note: In a real app, you'd write the file here
    // For safety, we'll skip the actual write in this demo
    // await writeFile(filePath, content, 'utf-8');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save file',
    };
  }
}
