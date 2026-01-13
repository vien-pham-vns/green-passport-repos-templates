import { Suspense } from 'react';

import TranslationEditor from '@dt/devtools/translation-editor-simple';
import { loadEnv } from '@dt/devtools/utils/variables-env';
import Box from '@mui/material/Box';

import { PaperLayout } from '@/components/paper-layout';

import { loadTranslationFiles } from './actions';

export default async function DevToolsPage() {
  console.log('process.env', loadEnv());
  if (
    process.env.DEPLOYMENT_ENV === 'development' ||
    process.env.DEPLOYMENT_ENV === 'staging'
  ) {
    // Load files on the server
    const initialFiles = await loadTranslationFiles();

    return (
      <Box>
        <Suspense fallback={<PaperLayout>Loading Translation Editor...</PaperLayout>}>
          <TranslationEditor initialFiles={initialFiles} />
        </Suspense>
      </Box>
    );
  }

  return null;
}
