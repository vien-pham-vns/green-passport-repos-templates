# @dt/devtools - Translation Editor

A modern, simplified translation management tool built with **React 19** and **Next.js 16** native APIs. Zero external state management dependencies - uses only native Web APIs and React features.

## ✨ Features

- 🚀 **Pure React 19 + Next.js 16** - No external state management libraries
- 🔗 **Native URLSearchParams** - Built-in browser API for query parameters
- ⚡ **React Compiler Optimized** - All components use `"use memo"` directive
- 🌐 **Server Component Integration** - Load files server-side with Next.js
- 🎯 **Type-Safe** - Full TypeScript coverage
- 📖 **Simple & Readable** - Easy to understand and maintain
- 🔄 **Non-blocking Updates** - Uses React 19 `useTransition` for smooth UX
- 🔍 **Real-time Search** - Instant filtering with URL persistence
- 📊 **Language Statistics** - Visual progress tracking
- 💾 **Bulk Export** - Download all translations as JSON files

## 📦 Installation

This package is part of the monorepo workspace:

```bash
pnpm add @dt/devtools
```

### Dependencies

```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "next": "16.1.1",
  "@mui/material": "^7.3.6",
  "flat": "^6.0.1"
}
```

**Note:** No state management libraries required (Redux, Zustand, nuqs, etc.)

## 🚀 Quick Start

### Basic Usage (Next.js App Router)

```tsx
// app/devtools/page.tsx (Server Component)
import { Suspense } from "react";
import TranslationEditor from "@dt/devtools/translation-editor-simple";

export default async function DevToolsPage() {
  // Load translation files server-side
  const files = await loadTranslationFiles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TranslationEditor initialFiles={files} />
    </Suspense>
  );
}
```

### Loading Translation Files (Server-Side)

```tsx
// app/devtools/actions.ts
"use server";

import fs from "fs/promises";
import path from "path";

export async function loadTranslationFiles() {
  const translationsDir = path.join(process.cwd(), "public/translations");
  const files = await fs.readdir(translationsDir);

  const translations = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (filename) => {
        const content = await fs.readFile(path.join(translationsDir, filename), "utf-8");
        const language = filename.replace(".json", "");
        return { language, filename, content };
      }),
  );

  return translations;
}
```

## 🏗️ Architecture

### Simplified Component Structure

```
TranslationEditor (Main)
├── TranslationToolbar (Filters)
├── LanguageStats (Statistics Cards)
└── TranslationTable (Editable Grid)
```

### Native Hooks

#### `useTranslationFilters()` - URL State Management

```tsx
import { useTranslationFilters } from "@dt/devtools/hooks/use-translation-filters";

function MyComponent() {
  const filters = useTranslationFilters();

  // Read values
  console.log(filters.search); // "" or search query
  console.log(filters.showMissing); // false or true
  console.log(filters.feature); // "all" or feature name

  // Update values (updates URL automatically)
  filters.setSearch("hello");
  filters.setShowMissing(true);
  filters.setFeature("auth");
  filters.reset(); // Clear all filters
}
```

**URL Format:**

```
/devtools?q=search+term&missing=1&feature=auth
```

| Param     | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| `q`       | string | `""`    | Search query for translations  |
| `missing` | `0\|1` | `0`     | Show only missing translations |
| `feature` | string | `all`   | Filter by top-level key        |

#### `useFilteredTranslations()` - Filtering Logic

```tsx
import { useFilteredTranslations } from "@dt/devtools/hooks/use-filtered-translations";

function MyComponent() {
  const filters = useTranslationFilters();
  const { files, entries, languages } = useTranslationFiles();

  const { availableFeatures, filteredEntries, languageStats } = useFilteredTranslations({
    entries,
    languages,
    searchQuery: filters.search,
    showOnlyMissing: filters.showMissing,
    selectedFeature: filters.feature,
  });

  // availableFeatures: ["auth", "common", "dashboard", ...]
  // filteredEntries: Array of filtered translation entries
  // languageStats: { en: { total: 100, translated: 95, ... }, ... }
}
```

## 🎨 React 19 Features Used

### 1. useTransition (Non-blocking Updates)

```tsx
import { useTransition } from "react";

function SearchInput() {
  const filters = useTranslationFilters();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    // Mark update as low priority - keeps UI responsive
    startTransition(() => {
      filters.setSearch(value);
    });
  };

  return <input onChange={(e) => handleSearch(e.target.value)} style={{ opacity: isPending ? 0.5 : 1 }} />;
}
```

### 2. React Compiler (`"use memo"`)

All components are optimized with React Compiler:

```tsx
"use client";
"use memo"; // Enables automatic optimization

export default function TranslationEditor() {
  // Component is automatically memoized
  // No manual useCallback/useMemo needed
}
```

### 3. Server Components (Next.js 16)

```tsx
// Server Component - runs on server only
export default async function Page() {
  // Direct file system access
  const files = await loadFiles();

  return <TranslationEditor initialFiles={files} />;
}
```

## 📖 API Reference

### Main Component

#### `<TranslationEditor />`

```tsx
interface TranslationEditorProps {
  initialFiles?: Array<{
    language: string;
    filename: string;
    content: string;
  }>;
}
```

**Example:**

```tsx
<TranslationEditor
  initialFiles={[
    { language: "en", filename: "en.json", content: '{"hello":"Hello"}' },
    { language: "th", filename: "th.json", content: '{"hello":"สวัสดี"}' },
  ]}
/>
```

### Hooks

#### `useTranslationFilters()`

Native URLSearchParams-based filtering.

**Returns:**

```tsx
{
  search: string;
  showMissing: boolean;
  feature: string;
  setSearch: (value: string) => void;
  setShowMissing: (value: boolean) => void;
  setFeature: (value: string) => void;
  reset: () => void;
}
```

#### `useFilteredTranslations(params)`

Filter and compute translation statistics.

**Returns:**

```tsx
{
  availableFeatures: string[];
  filteredEntries: FlatTranslationEntry[];
  languageStats: Record<string, LanguageStatistics>;
}
```

#### `useTranslationFiles()`

Manage translation file state.

**Returns:**

```tsx
{
  files: TranslationFile[];
  entries: FlatTranslationEntry[];
  languages: string[];
  loading: boolean;
  error: string | null;
  loadFiles: (fileList: FileList) => Promise<void>;
  updateTranslation: (key: string, lang: string, value: string) => void;
  reset: () => void;
}
```

## 🎯 Advanced Usage

### Custom File Loading

```tsx
"use client";

import { useTranslationFiles } from "@dt/devtools/hooks/use-translation-files";

export function CustomLoader() {
  const { loadFiles } = useTranslationFiles();

  const loadFromAPI = async () => {
    const response = await fetch("/api/translations");
    const data = await response.json();

    // Convert API data to FileList
    const dataTransfer = new DataTransfer();
    for (const { filename, content } of data) {
      const blob = new Blob([content], { type: "application/json" });
      const file = new File([blob], filename, { type: "application/json" });
      dataTransfer.items.add(file);
    }

    await loadFiles(dataTransfer.files);
  };

  return <button onClick={loadFromAPI}>Load from API</button>;
}
```

### Building Custom Filters

```tsx
"use client";

import { useTranslationFilters } from "@dt/devtools/hooks/use-translation-filters";

export function CustomFilters() {
  const filters = useTranslationFilters();

  return (
    <div>
      <input placeholder="Search..." onChange={(e) => filters.setSearch(e.target.value)} />

      <label>
        <input type="checkbox" checked={filters.showMissing} onChange={(e) => filters.setShowMissing(e.target.checked)} />
        Show only missing
      </label>
    </div>
  );
}
```

## 🔧 Development

```bash
# Type checking
pnpm check-types --filter=@dt/devtools

# Linting
pnpm lint --filter=@dt/devtools

# Build
pnpm build --filter=@dt/devtools
```

## 📁 File Structure

```
packages/devtools/
├── src/
│   ├── components/
│   │   ├── translation-editor-simple.tsx    # Main editor
│   │   ├── translation-toolbar-simple.tsx   # Toolbar
│   │   ├── translation-table.tsx            # Table
│   │   ├── language-stats.tsx               # Stats
│   │   └── file-uploader.tsx                # Uploader
│   ├── hooks/
│   │   ├── use-url-search-params.ts         # Native filters
│   │   ├── use-filtered-translations.ts     # Filtering
│   │   ├── use-translation-files.ts         # File mgmt
│   │   └── use-translation-sync.ts          # Export
│   └── utils/
│       ├── file-parser.ts                   # Parsing
│       ├── file-writer.ts                   # I/O
│       └── diff-checker.ts                  # Diffing
├── ARCHITECTURE.md                           # Details
├── README.md                                 # This file
└── package.json
```

## 🚀 Performance

1. **React Compiler** - Automatic memoization
2. **useTransition** - Non-blocking updates
3. **Shallow Routing** - No server round-trips
4. **useMemo** - Efficient filtering
5. **Server Components** - Smaller bundles

## 📝 TypeScript Types

### TranslationFile

```ts
interface TranslationFile {
  language: string;
  filename: string;
  data: TranslationObject;
  lastModified?: Date;
}
```

### FlatTranslationEntry

```ts
interface FlatTranslationEntry {
  key: string; // "auth.login.title"
  path: string[]; // ["auth", "login", "title"]
  values: Record<string, string>; // { en: "Login", th: "เข้าสู่ระบบ" }
}
```

## 📚 Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed docs
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)

---

**Built with ❤️ using React 19 and Next.js 16 native APIs**
