import { Suspense } from "react";

import TranslationEditor from "@dt/devtools/translation-editor-simple";
import { loadEnv } from "@dt/devtools/utils/variables-env";

import { loadTranslationFiles } from "./actions";

export default async function DevToolsPage() {
  if (
    process.env.DEPLOYMENT_ENV === "development" ||
    process.env.DEPLOYMENT_ENV === "staging"
  ) {
    // Load files on the server
    const initialFiles = await loadTranslationFiles();

    return (
      <div>
        <Suspense fallback={<>Loading Translation Editor...</>}>
          <TranslationEditor initialFiles={initialFiles} />
        </Suspense>
      </div>
    );
  }

  return null;
}
