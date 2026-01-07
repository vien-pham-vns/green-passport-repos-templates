# DevTools Translation - Simplified Architecture

## Overview

A modern, simplified translation editor built with **React 19** and **Next.js 16** native APIs. Zero external state management dependencies - uses only native Web APIs and React features.

## Key Features

✅ **Pure React 19 + Next.js 16** - No external state management libraries
✅ **Native URLSearchParams** - Built-in browser API for query parameters
✅ **React Compiler Optimized** - All components use `"use memo"` directive
✅ **Server Component Integration** - Load files server-side with Next.js
✅ **Type-Safe** - Full TypeScript coverage
✅ **Simple & Readable** - Easy to understand and maintain

## Architecture

### Components

#### 1. **TranslationEditor** (Simplified Main Component)
[translation-editor-simple.tsx](src/components/translation-editor-simple.tsx)

```tsx
"use memo"; // React Compiler optimization

export default function TranslationEditor({ initialFiles }) {
  const filters = useTranslationFilters(); // Native URLSearchParams
  const { files, entries, languages, ... } = useTranslationFiles();
  const { filteredEntries, availableFeatures, languageStats } = useFilteredTranslations({
    entries,
    languages,
    searchQuery: filters.search,
    showOnlyMissing: filters.showMissing,
    selectedFeature: filters.feature,
  });

  // ... render logic
}
```

**Features:**
- Auto-loads files from server-side props
- URL-based filtering (search, feature, show missing)
- Real-time statistics
- Inline editing

#### 2. **TranslationToolbar** (Simplified Toolbar)
[translation-toolbar-simple.tsx](src/components/translation-toolbar-simple.tsx)

```tsx
"use memo";

export default function TranslationToolbar({ availableFeatures, ... }) {
  const filters = useTranslationFilters();
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      filters.setSearch(value); // Non-blocking URL update
    });
  };

  // ... render filters and actions
}
```

**Features:**
- Native URLSearchParams integration
- React 19 `useTransition` for non-blocking updates
- Search, feature filter, show missing toggle
- Download and reset actions

### Hooks

#### 1. **useTranslationFilters** (Native Hook)
[use-url-search-params.ts](src/hooks/use-url-search-params.ts)

```tsx
export function useTranslationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read from URL
  const search = searchParams.get("q") ?? "";
  const showMissing = searchParams.get("missing") === "1";
  const feature = searchParams.get("feature") ?? "all";

  // Update URL (shallow routing)
  const updateFilter = useCallback((key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);
    // ... update logic
    router.replace(`${pathname}?${params}`, { scroll: false });
  }, [searchParams, pathname, router]);

  return {
    search, showMissing, feature,
    setSearch, setShowMissing, setFeature,
    reset,
  };
}
```

**Why this approach?**
- ✅ Zero dependencies
- ✅ Native Web API (URLSearchParams)
- ✅ Shallow routing (no server round-trips)
- ✅ Simple and readable
- ✅ URL state is shareable

#### 2. **useFilteredTranslations** (Filtering Logic)
[use-filtered-translations.ts](src/hooks/use-filtered-translations.ts)

```tsx
"use memo";

export function useFilteredTranslations({ entries, languages, searchQuery, showOnlyMissing, selectedFeature }) {
  // useMemo for expensive computations (React Compiler friendly)
  const availableFeatures = useMemo(() => { /* ... */ }, [entries]);
  const filteredEntries = useMemo(() => { /* ... */ }, [entries, selectedFeature, searchQuery, showOnlyMissing, languages]);
  const languageStats = useMemo(() => { /* ... */ }, [entries, languages]);

  return { availableFeatures, filteredEntries, languageStats };
}
```

**React Compiler Optimization:**
- Uses `useMemo` for expensive operations
- Marked with `"use memo"` directive
- Automatically optimized by React Compiler

## React 19 Features Used

### 1. **useTransition** (Non-blocking Updates)
```tsx
const [isPending, startTransition] = useTransition();

const handleSearchChange = (value: string) => {
  startTransition(() => {
    filters.setSearch(value); // Marks as low priority
  });
};
```

**Benefits:**
- UI stays responsive during updates
- Search doesn't block other interactions
- Visual feedback with `isPending` state

### 2. **React Compiler** (`"use memo"` directive)
```tsx
"use client";
"use memo"; // Enables React Compiler optimizations

export default function Component() {
  // Component automatically optimized
}
```

**Benefits:**
- Automatic memoization
- Fewer manual `useCallback`/`useMemo`
- Better performance

## Next.js 16 Integration

### Server Component Pattern
```tsx
// app/(main)/devtools/page.tsx (Server Component)
export default async function DevToolsPage() {
  const initialFiles = await loadTranslationFiles(); // Server-side

  return (
    <Suspense fallback={<Loading />}>
      <TranslationEditor initialFiles={initialFiles} />
    </Suspense>
  );
}
```

**Benefits:**
- Files loaded on server (faster initial load)
- No client-side waterfall
- SEO-friendly
- Reduced client bundle size

## URL Query Parameters

### Format
```
/devtools?q=search+term&missing=1&feature=auth
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | `""` | Search query |
| `missing` | `0\|1` | `0` | Show only missing translations |
| `feature` | string | `all` | Filter by top-level key |

### Benefits
- ✅ Shareable URLs
- ✅ Browser back/forward works
- ✅ Bookmarkable states
- ✅ No external libraries needed

## File Structure

```
packages/devtools/
├── src/
│   ├── components/
│   │   ├── translation-editor-simple.tsx    # Main simplified editor
│   │   ├── translation-toolbar-simple.tsx   # Simplified toolbar
│   │   ├── translation-table.tsx            # Editable table
│   │   ├── language-stats.tsx               # Statistics cards
│   │   └── file-uploader.tsx                # File upload UI
│   ├── hooks/
│   │   ├── use-url-search-params.ts         # Native URLSearchParams hook
│   │   ├── use-filtered-translations.ts     # Filtering logic
│   │   ├── use-translation-files.ts         # File management
│   │   └── use-translation-sync.ts          # Download sync
│   ├── utils/
│   │   ├── file-parser.ts                   # JSON parsing/flattening
│   │   ├── file-writer.ts                   # File I/O
│   │   └── diff-checker.ts                  # Translation diffing
│   └── types/
│       └── index.ts                          # TypeScript types
└── package.json
```

## Dependencies

### Required
- `react` ^19.2.3
- `react-dom` ^19.2.3
- `next` 16.1.1
- `@mui/material` ^7.3.6
- `flat` ^6.0.1 (for nested object flattening)

### Zero State Management Libraries
- ❌ No Redux
- ❌ No Zustand
- ❌ No nuqs
- ❌ No use-debounce

### Why?
- Native URLSearchParams handles query state
- React 19 Compiler handles memoization
- Next.js router handles navigation
- Simpler, more maintainable code

## Performance Optimizations

1. **React Compiler** (`"use memo"`)
   - Automatic memoization of expensive computations
   - Reduces unnecessary re-renders

2. **useTransition**
   - Non-blocking search updates
   - Keeps UI responsive

3. **Shallow Routing**
   - URL updates without server round-trips
   - Instant filter changes

4. **useMemo for Filtering**
   - Expensive filtering only runs when dependencies change
   - Prevents unnecessary recomputation

5. **Server-Side Loading**
   - Files loaded on server
   - Faster initial paint
   - Smaller client bundle

## Usage Example

```tsx
// Server Component
import TranslationEditor from '@dt/devtools/translation-editor-simple';

export default async function Page() {
  const files = await loadFiles(); // Server-side

  return <TranslationEditor initialFiles={files} />;
}
```

## Migration from Old Versions

### Old (nuqs + external libraries)
```tsx
import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

const [filters, setFilters] = useQueryStates(schema);
const handleSearch = useDebouncedCallback((value) => {
  setFilters({ search: value });
}, 300);
```

### New (native APIs)
```tsx
import { useTranslationFilters } from "@dt/devtools/hooks/use-translation-filters";
import { useTransition } from "react";

const filters = useTranslationFilters();
const [_, startTransition] = useTransition();

const handleSearch = (value: string) => {
  startTransition(() => filters.setSearch(value));
};
```

**Benefits:**
- Simpler code
- Fewer dependencies
- Better performance with React 19
- More readable

## Testing

```bash
# Type checking
pnpm check-types --filter=@dt/devtools

# Linting
pnpm lint --filter=@dt/devtools

# Build
pnpm build --filter=@dt/devtools
```

## Future Enhancements

- [ ] Add keyboard shortcuts (Cmd+K for search)
- [ ] Bulk edit mode
- [ ] Translation memory/suggestions
- [ ] Export to different formats (YAML, XML)
- [ ] Import from Google Sheets
- [ ] Real-time collaboration
- [ ] Git integration for version control

## Conclusion

This architecture demonstrates how modern React 19 and Next.js 16 eliminate the need for external state management libraries. By leveraging native Web APIs (URLSearchParams), React 19 features (useTransition, Compiler), and Next.js server components, we achieve a simpler, more maintainable, and performant solution.

**Key Takeaway:** *Simpler is better. Use the platform.*
