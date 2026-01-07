import { Suspense } from 'react';

import TranslationEditor from '@dt/devtools/translation-editor-simple';
import Box from '@mui/material/Box';

import { PaperLayout } from '@/components/paper-layout';

import { loadTranslationFiles } from './actions';

export default async function DevToolsPage() {
  if (process.env.DEPLOYMENT_ENV === 'development') {
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
