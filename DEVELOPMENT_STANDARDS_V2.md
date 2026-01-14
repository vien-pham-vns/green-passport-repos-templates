# Green Passport Development Standards v2.0

> **Comprehensive development standards based on actual codebase implementation**  
> Last Updated: 2026-01-14  
> Next.js 16 | React 19 | Material-UI v7 | Tailwind CSS v4 | TypeScript 5.9

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Feature Module Organization](#feature-module-organization)
3. [Component Architecture](#component-architecture)
4. [Server Actions & Caching](#server-actions--caching)
5. [State Management](#state-management)
6. [Data Fetching Patterns](#data-fetching-patterns)
7. [Styling & Theming](#styling--theming)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Custom Hooks Library](#custom-hooks-library)
10. [Table Components](#table-components)
11. [Query Parameter Management](#query-parameter-management)
12. [Authentication & Routing](#authentication--routing)
13. [Performance Optimization](#performance-optimization)
14. [Testing Standards](#testing-standards)
15. [File Naming Conventions](#file-naming-conventions)
16. [Code Quality & Linting](#code-quality--linting)

---

## Project Architecture

### Monorepo Structure

```plaintext
green-passport-repos-templates/
├── apps/
│   └── gpass-portal/          # Green Passport Portal (Next.js 16)
├── packages/
│   ├── mui-ui/                # Material-UI v7 component library
│   ├── devtools/              # Development tools & utilities
│   ├── eslint-config/         # Shared ESLint configurations
│   └── typescript-config/     # Shared TypeScript configurations
└── turbo.json                 # Turborepo configuration
```

### Technology Stack

| Category             | Technology      | Version   |
| -------------------- | --------------- | --------- |
| **Framework**        | Next.js         | 16.1.1    |
| **React**            | React           | 19.x      |
| **UI Library**       | Material-UI     | 7.3.6     |
| **Styling**          | Tailwind CSS    | v4 (beta) |
| **State Management** | Zustand         | 5.0.2     |
| **Server State**     | TanStack Query  | 5.69.0    |
| **Forms**            | React Hook Form | 7.71.0    |
| **Validation**       | Zod             | 4.3.5     |
| **TypeScript**       | TypeScript      | 5.9.2     |
| **Package Manager**  | pnpm            | 10.16.1   |
| **Build System**     | Turborepo       | 2.6.1     |
| **Testing**          | Vitest          | 4.x       |

### Application Structure

```plaintext
apps/gpass-portal/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (main)/           # Main layout group
│   │   ├── login/            # Login page
│   │   └── globals.css       # Global styles (Tailwind v4)
│   ├── features/             # Feature modules (business logic)
│   ├── components/           # Shared UI components
│   ├── providers/            # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand stores
│   ├── services/             # API service functions
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript type definitions
│   ├── lib/                  # Library configurations
│   └── constant/             # Application constants
├── messages/                 # i18n translation files
│   ├── en.json
│   └── th.json
├── public/                   # Static assets
└── test/                     # Test configuration
```

---

## Feature Module Organization

### Directory Structure

Features follow a **private/public pattern** using underscore prefixes for internal files:

```plaintext
features/
└── portal/
    ├── index.tsx                # Public export (page component)
    ├── _components/             # Private components (internal use only)
    │   ├── table-layout.tsx
    │   ├── table-data.tsx
    │   └── filter-section.tsx
    ├── _hooks/                  # Private hooks (internal use only)
    │   ├── use-columns.tsx
    │   ├── use-portal-filter.tsx
    │   └── use-export.ts
    ├── _libs/                   # Private utilities (internal use only)
    │   └── helpers.ts
    ├── actions/                 # Server actions directory
    │   └── example-action.ts
    ├── config.ts                # Feature configuration & constants
    ├── type.ts                  # TypeScript type definitions
    └── utils.ts                 # Shared utility functions
```

### Underscore Prefix Convention

**Purpose:** Clearly distinguish between public APIs and internal implementation details.

**Rules:**

- `_components/` - Components used only within this feature
- `_hooks/` - Hooks used only within this feature
- `_libs/` - Utilities used only within this feature
- No underscore - Public exports that can be imported by other features

**Example:**

```tsx
// ✅ GOOD - Internal component
// features/portal/_components/table-layout.tsx
export function TableLayout({ children }) {
  return <div>{children}</div>;
}

// ✅ GOOD - Public page component
// features/portal/index.tsx
import { TableLayout } from "./_components/table-layout";

export default function PortalPage() {
  return <TableLayout>...</TableLayout>;
}

// ❌ BAD - Don't import from other features' private directories
// features/dashboard/index.tsx
import { TableLayout } from "../portal/_components/table-layout"; // ❌ Wrong!
```

### Actions Directory Pattern

Server actions are organized in a dedicated `actions/` subdirectory:

```plaintext
features/portal/
└── actions/
    ├── fetch-applications.ts    # GET operations
    ├── create-application.ts    # POST operations
    ├── update-application.ts    # PUT/PATCH operations
    └── delete-application.ts    # DELETE operations
```

---

## Component Architecture

### Component Organization Patterns

#### 1. Composable Layout Components

The codebase uses **compound component patterns** for complex layouts:

```tsx
// components/layouts/table-view/index.tsx
"use client";

import { createContext, useContext } from "react";

type TableViewContextValue = {
  variant: "default" | "compact";
};

const TableViewContext = createContext<TableViewContextValue | null>(null);

export function TableView({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "compact" }) {
  return (
    <TableViewContext.Provider value={{ variant }}>
      <div className="table-view">{children}</div>
    </TableViewContext.Provider>
  );
}

export function TableViewHeader({ children }: { children: React.ReactNode }) {
  return <div className="table-view-header">{children}</div>;
}

export function TableViewTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="table-view-title">{children}</h2>;
}

export function TableViewActions({ children }: { children: React.ReactNode }) {
  return <div className="table-view-actions">{children}</div>;
}

export function TableViewContent({ children }: { children: React.ReactNode }) {
  return <div className="table-view-content">{children}</div>;
}

export function TableViewFilters({ children }: { children: React.ReactNode }) {
  return <div className="table-view-filters">{children}</div>;
}

export function TableViewTable({ children }: { children: React.ReactNode }) {
  return <div className="table-view-table">{children}</div>;
}

// Export as namespace for better DX
TableView.Header = TableViewHeader;
TableView.Title = TableViewTitle;
TableView.Actions = TableViewActions;
TableView.Content = TableViewContent;
TableView.Filters = TableViewFilters;
TableView.Table = TableViewTable;
```

**Usage:**

```tsx
// features/portal/index.tsx
import { TableView } from "@/components/layouts/table-view";
import { Button } from "@mui/material";

export default function PortalPage() {
  return (
    <TableView variant="default">
      <TableView.Header>
        <TableView.Title>Applications</TableView.Title>
        <TableView.Actions>
          <Button variant="contained">Add New</Button>
        </TableView.Actions>
      </TableView.Header>
      <TableView.Content>
        <TableView.Filters>{/* Filter components */}</TableView.Filters>
        <TableView.Table>{/* DataGrid component */}</TableView.Table>
      </TableView.Content>
    </TableView>
  );
}
```

#### 2. Private Component Organization

Complex components use internal subdirectories:

```plaintext
components/app-layout/
├── index.tsx                    # Public export
├── _components/                 # Private components
│   ├── app-layout-client.tsx
│   ├── app-header.tsx
│   ├── app-sidebar.tsx
│   └── sidebar/
│       ├── config.tsx
│       ├── styles.tsx
│       ├── utils.ts
│       └── type.ts
└── _libs/
    └── breadcrumb.config.ts
```

**Example:**

```tsx
// components/app-layout/index.tsx
import { AppLayoutClient } from "./_components/app-layout-client";

export function AppLayout({ children }) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}

// components/app-layout/_components/app-layout-client.tsx
("use client");

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function AppLayoutClient({ children }) {
  return (
    <div>
      <AppHeader />
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}
```

#### 3. React Compiler Optimization

Use the `'use memo'` directive for components that benefit from automatic memoization:

```tsx
"use client";
"use memo"; // React Compiler opt-in

export const AppBreadcrumb = () => {
  const t = useTranslations("app-layout");
  const pathname = usePathname();

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Breadcrumbs>
      {breadcrumbs.map((crumb) => (
        <Link key={crumb.path} href={crumb.path}>
          {t(crumb.label)}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
```

**When to use `'use memo'`:**

- ✅ Components with expensive computations
- ✅ Components that render frequently
- ✅ Components with complex prop transformations
- ✅ Custom hooks with heavy logic
- ❌ Simple presentational components
- ❌ Server Components (not applicable)

**Configuration:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: {
    compilationMode: "annotation", // Only compile components with 'use memo'
  },
};
```

---

## Server Actions & Caching

### The "use cache" Pattern

Server actions use Next.js 16's `'use cache'` directive for server-side caching.

#### Pattern 1: Basic Cached Action

```typescript
// features/portal/actions/fetch-applications.ts
"use server";

import { cacheLife, revalidateTag } from "next/cache";
import { apiCore } from "@/services/common";
import { fetchApi } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";

export async function fetchApplicationServer(params?: ApplicationParams) {
  return getApplicationListCached(params);
}

async function getApplicationListCached(params?: ApplicationParams) {
  "use cache";
  cacheLife("minutes"); // Cache for 1 minute

  const url = apiCore("/doa/harvest/dashboard", "v1");
  const response = await fetchApi<ApplicationTableResponse>(url, {
    method: "GET",
    params: params as unknown as QueryParamsFilter,
    cacheTags: ["application-list"],
    logLabel: "ApplicationList",
    accessToken: "your-token-here", // Direct token passing
  });

  if (!response) {
    throw new Error("Failed to fetch harvest record list");
  }

  return response;
}

export const revalidateApplicationList = async () => {
  "use server";
  revalidateTag("application-list", { expire: 10 }); // Expire in 10 seconds
};
```

#### Pattern 2: With Cookie Context (Recommended for Auth)

```typescript
// features/container/actions.ts
"use server";

import { cacheLife, revalidateTag } from "next/cache";
import { apiCore } from "@/services/common";
import { fetchApi, getCookieContext, type CookieContext } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";
import { CONTAINER_CACHE_TAG } from "./config";

/**
 * Public function - gets cookie context
 */
export async function getContainerServerSide(params?: ContainerTableParams) {
  const ctx = await getCookieContext();
  return getContainerCached(ctx, params);
}

/**
 * Cached function - receives cookie context as parameter
 * IMPORTANT: Cookie context must be passed as parameter, not accessed inside
 */
async function getContainerCached(ctx: CookieContext, params?: ContainerTableParams) {
  "use cache";
  cacheLife("seconds"); // Cache lifetime

  const url = apiCore("/doa/container", "v1");

  const response = await fetchApi<ContainerTableResponse>(url, {
    ...ctx, // Spread cookie context (accessToken, locale)
    method: "GET",
    params: params as QueryParamsFilter,
    cacheTags: [CONTAINER_CACHE_TAG],
    logLabel: "ContainerList",
  });

  if (!response) {
    throw new Error("Failed to fetch container list");
  }

  // Transform data before returning
  return {
    ...response,
    data: {
      ...response.data,
      items: transformContainer(response.data),
    },
  };
}

function transformContainer(container: Container): ContainerItem[] {
  if (!container?.items?.length) return [];

  return container.items.map((item) => Object.assign({}, item, { id: item.containerId.toString() }));
}

export async function revalidateContainerList() {
  "use server";
  revalidateTag(CONTAINER_CACHE_TAG, { expire: 0 });
}
```

**Cache Configuration:**

```typescript
// features/container/config.ts
export const CONTAINER_CACHE_TAG = "container-list";
```

### Cache Lifetime Options

```typescript
// Available cacheLife options
cacheLife("seconds"); // 1 second
cacheLife("minutes"); // 1 minute
cacheLife("hours"); // 1 hour
cacheLife("days"); // 1 day
cacheLife("weeks"); // 1 week
cacheLife("max"); // Maximum (indefinite)

// Custom duration
cacheLife({ seconds: 30 });
cacheLife({ minutes: 5 });
cacheLife({ hours: 24 });
```

### Revalidation Patterns

```typescript
// Immediate revalidation
revalidateTag("products", { expire: 0 });

// Delayed revalidation (10 seconds)
revalidateTag("products", { expire: 10 });

// Revalidate multiple tags
export async function revalidateProductData() {
  "use server";
  revalidateTag("products", { expire: 0 });
  revalidateTag("product-categories", { expire: 0 });
  revalidateTag("product-stats", { expire: 0 });
}
```

### Key Principles

1. **Separate Public and Cached Functions**
   - Public function gets cookie context
   - Internal function has `'use cache'` directive

2. **Cookie Context Pattern**
   - Call `getCookieContext()` OUTSIDE cached function
   - Pass context as parameter INTO cached function
   - Never access cookies inside `'use cache'` functions

3. **Cache Tags**
   - Use descriptive, feature-specific tags
   - Define tags in `config.ts` for consistency
   - Use tags for targeted revalidation

4. **Data Transformation**
   - Transform data inside cached function
   - Return ready-to-use data structures
   - Avoid transformations in components

---

## State Management

### Zustand Stores

#### SSR-Safe Store Pattern

```typescript
// store/use-sidebar-store.ts
import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => {
  // SSR-safe initialization from sessionStorage
  const stored = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("sidebarOpen") : null;
  const initialIsOpen = stored !== null ? stored === "true" : true;

  return {
    isOpen: initialIsOpen,
    setIsOpen: (isOpen) => {
      set({ isOpen });
      // SSR-safe storage update
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("sidebarOpen", String(isOpen));
      }
    },
    toggle: () => {
      set((state) => {
        const newIsOpen = !state.isOpen;
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("sidebarOpen", String(newIsOpen));
        }
        return { isOpen: newIsOpen };
      });
    },
  };
});

export default useSidebarStore;
```

#### When to Use Zustand

- ✅ Global UI state (sidebar, modals, theme)
- ✅ Authentication state
- ✅ Temporary form data across routes
- ✅ User preferences
- ❌ Server data (use TanStack Query instead)
- ❌ Form state (use React Hook Form instead)

### TanStack Query (React Query)

#### Query Configuration

```typescript
// providers/query-client-provider.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on authentication errors (401/403)
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status === 401 || axiosError?.response?.status === 403) {
          return false;
        }
        // Don't retry on service unavailable (503)
        if (axiosError?.response?.status === 503) {
          return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
    },
  },
});

const Provider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default Provider;
```

#### When to Use TanStack Query

- ✅ Client-side data fetching
- ✅ Real-time data updates
- ✅ Polling/refetching
- ✅ Optimistic updates
- ✅ Infinite scroll/pagination
- ❌ Initial page data (use Server Components instead)
- ❌ SEO-critical data (use Server Components instead)

---

## Data Fetching Patterns

### fetchApi Utility

The centralized `fetchApi` utility handles all API requests with automatic transformations and logging.

```typescript
// utils/fetch-api.ts
"use server";

import { cookies } from "next/headers";
import { logHttpRequest } from "utils/logger";
import { toCamel, toSnake } from "utils/transform";
import { getHeaderAccessToken } from "@/lib/auth";

export interface FetchApiOptions extends Omit<RequestInit, "body"> {
  /** Query parameters to append to URL */
  params?: QueryParamsFilter;
  /** Request body (will be automatically converted to snake_case) */
  body?: unknown;
  /** Cache tags for Next.js cache invalidation */
  cacheTags?: string[];
  /** Whether to transform response to camelCase (default: true) */
  transformResponse?: boolean;
  /** Whether to transform request body to snake_case (default: true) */
  transformRequest?: boolean;
  /** Custom access token (optional, will use cookie if not provided) */
  accessToken?: string;
  /** Custom locale (optional, will use cookie if not provided) */
  locale?: string;
  /** Whether to include credentials (default: true) */
  includeCredentials?: boolean;
  /** Whether to log HTTP requests (default: true) */
  logRequest?: boolean;
  /** Label for logging purposes */
  logLabel?: string;
}

export interface CookieContext {
  accessToken: string;
  locale: string;
}

/**
 * Get cookie context for use in cached functions
 */
export async function getCookieContext(): Promise<CookieContext> {
  const accessToken = await getHeaderAccessToken();
  const cookieStore = await cookies();
  const locale = cookieStore.get(NEXT_LOCALE)?.value || "en";

  if (!accessToken) {
    throw new Error("Failed to get accessToken");
  }

  return { accessToken, locale };
}

/**
 * Core fetch API function
 */
export async function fetchApi<T = unknown>(url: string, options: FetchApiOptions = {}): Promise<T> {
  const { params, body, cacheTags = [], transformResponse = true, transformRequest = true, accessToken, locale, includeCredentials = true, logRequest = true, logLabel = "API Request", ...fetchOptions } = options;

  // Build URL with query parameters
  const finalUrl = params ? buildRequestParams(url, params) : url;

  // Prepare headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(locale && { "Accept-Language": locale }),
    ...fetchOptions.headers,
  };

  // Transform request body to snake_case
  const transformedBody = body && transformRequest ? toSnake(body) : body;

  // Make request
  const response = await fetch(finalUrl, {
    ...fetchOptions,
    headers,
    body: transformedBody ? JSON.stringify(transformedBody) : undefined,
    credentials: includeCredentials ? "include" : "omit",
    next: {
      tags: cacheTags,
      ...fetchOptions.next,
    },
  });

  // Log request
  if (logRequest) {
    logHttpRequest({
      label: logLabel,
      url: finalUrl,
      method: fetchOptions.method || "GET",
      status: response.status,
    });
  }

  // Handle errors
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // Parse and transform response
  const data = await response.json();
  return transformResponse ? toCamel(data) : data;
}
```

### Usage Examples

```typescript
// Simple GET request
const data = await fetchApi<ProductResponse>("/api/products", {
  method: "GET",
  cacheTags: ["products"],
  logLabel: "FetchProducts",
});

// GET with query parameters
const data = await fetchApi<ProductResponse>("/api/products", {
  method: "GET",
  params: { page: 1, limit: 10, category: "electronics" },
  cacheTags: ["products"],
});

// POST with body
const data = await fetchApi<CreateProductResponse>("/api/products", {
  method: "POST",
  body: { name: "New Product", price: 99.99 },
  logLabel: "CreateProduct",
});

// With cookie context (for cached functions)
const ctx = await getCookieContext();
const data = await fetchApi<ProductResponse>("/api/products", {
  ...ctx,
  method: "GET",
  cacheTags: ["products"],
});
```

---

## Styling & Theming

### Tailwind CSS v4 Integration

The project uses **Tailwind CSS v4** (beta) with Material-UI integration.

#### Global Styles

```css
/* app/globals.css */
@import "tailwindcss";

@layer theme, base, mui, components, utilities;

@theme {
  /* Map MUI palette to Tailwind theme */
  --color-brand-50: var(--mui-palette-brand-50);
  --color-brand-100: var(--mui-palette-brand-100);
  --color-brand-200: var(--mui-palette-brand-200);
  --color-brand-300: var(--mui-palette-brand-300);
  --color-brand-400: var(--mui-palette-brand-400);
  --color-brand-500: var(--mui-palette-brand-500);
  --color-brand-600: var(--mui-palette-brand-600);
  --color-brand-700: var(--mui-palette-brand-700);
  --color-brand-800: var(--mui-palette-brand-800);
  --color-brand-900: var(--mui-palette-brand-900);

  --color-neutral-50: var(--mui-palette-neutral-50);
  --color-neutral-100: var(--mui-palette-neutral-100);
  --color-neutral-200: var(--mui-palette-neutral-200);
  --color-neutral-300: var(--mui-palette-neutral-300);
  --color-neutral-400: var(--mui-palette-neutral-400);
  --color-neutral-500: var(--mui-palette-neutral-500);
  --color-neutral-600: var(--mui-palette-neutral-600);
  --color-neutral-700: var(--mui-palette-neutral-700);
  --color-neutral-800: var(--mui-palette-neutral-800);
  --color-neutral-900: var(--mui-palette-neutral-900);
}

:root {
  /* Global layout variables */
  --header-height: 56px;
  --sidebar-width: 240px;
  --collapsed-sidebar-width: 64px;

  /* MUI palette variables (for non-Tailwind usage) */
  --brand-50: var(--mui-palette-brand-50);
  --brand-100: var(--mui-palette-brand-100);
  /* ... */
}
```

#### CSS Layers

The project uses CSS layers for specificity control:

1. **theme** - Tailwind theme variables
2. **base** - Base styles
3. **mui** - Material-UI component styles
4. **components** - Custom component styles
5. **utilities** - Utility classes

#### Material-UI Theme

```typescript
// packages/mui-ui/src/theme/create-theme.ts
"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

export function createAppTheme(options?: ThemeOptions) {
  return createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: "class",
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@layer mui, app": {
            // CSS layers for better specificity control
          },
        },
      },
      ...options?.components,
    },
    ...options,
  });
}

export const defaultTheme = createAppTheme();
```

### When to Use Tailwind vs. MUI sx Prop

**Use Tailwind for:**

- ✅ Layout (flex, grid, spacing)
- ✅ Typography utilities
- ✅ Simple styling
- ✅ Responsive design
- ✅ Static styles

**Use MUI sx prop for:**

- ✅ Theme-aware styling
- ✅ Dynamic styles based on props
- ✅ Component-specific overrides
- ✅ Complex responsive patterns
- ✅ Accessing theme tokens

**Example:**

```tsx
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function ProductCard({ product }) {
  return (
    <Box
      className="flex flex-col gap-4 p-4" // Tailwind for layout
      sx={{
        // MUI sx for theme-aware styling
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[2],
      }}
    >
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <Button
        variant="contained"
        sx={{ mt: 2 }} // MUI spacing
      >
        Add to Cart
      </Button>
    </Box>
  );
}
```

---

## Internationalization (i18n)

### Translation Provider Pattern

The project uses a custom translation provider with Mustache interpolation.

#### Server-Side Provider

```tsx
// providers/translation-provider/index.tsx
import React from "react";
import { Locale } from "@/lib/i18n-config";
import { TranslateMessages, TranslationContext } from "./client";

interface TranslationProviderProps {
  locale: Locale;
  messages: TranslateMessages;
  children: React.ReactNode;
}

export function TranslationProvider({ locale, messages, children }: TranslationProviderProps) {
  return <TranslationContext value={{ locale, messages }}>{children}</TranslationContext>;
}
```

#### Client-Side Hooks

```tsx
// providers/translation-provider/client.tsx
"use client";

import React, { createContext } from "react";
import { get } from "es-toolkit/compat";
import Mustache from "mustache";
import { Locale } from "@/lib/i18n-config";
import { initDayjsLocale } from "@/utils/date";

export type TranslateMessages = Record<string, unknown>;

interface TranslationContextValue {
  locale: Locale;
  messages: TranslateMessages;
}

const Context = createContext<TranslationContextValue | null>(null);

export function TranslationContext({ value, children }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTranslationsContext(): {
  locale: Locale;
  messages: TranslateMessages;
} {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  initDayjsLocale(context.locale);

  return { locale: context.locale, messages: context.messages };
}

export const interpolate = (text: string, values: Record<string, unknown> = {}): string => {
  try {
    return Mustache.render(text, values);
  } catch (error) {
    console.error("Translation interpolation error:", error);
    return text;
  }
};

/**
 * Get translation object for direct access (recommended)
 */
export function useTranslation(key: string): Record<string, string> {
  const { messages } = useTranslationsContext();
  return get(messages, key, {}) as Record<string, string>;
}

/**
 * Get translation function (backward compatibility)
 * @deprecated Use `useTranslation` for direct access instead
 */
export function useTranslations(key: string) {
  const { messages } = useTranslationsContext();
  const res = get(messages, key, key);

  return (curKey: string, values?: Record<string, unknown>): string => {
    const text = get(res, curKey, curKey);
    return typeof text === "string" ? interpolate(text, values) : String(text);
  };
}
```

### Usage Patterns

#### Pattern 1: useTranslations (Function-based)

```tsx
"use client";

import { useTranslations } from "@/providers/translation-provider/client";

export function WelcomeMessage() {
  const t = useTranslations("app-layout");

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("greeting", { userName: "John" })}</p>
    </div>
  );
}
```

#### Pattern 2: useTranslation (Object-based - Recommended)

```tsx
"use client";

import { useTranslation, interpolate } from "@/providers/translation-provider/client";

export function WelcomeMessage({ userName }) {
  const t = useTranslation("app-layout");

  return (
    <div>
      <h1>{t["welcome"]}</h1>
      <p>{interpolate(t["greeting"], { userName })}</p>
    </div>
  );
}
```

#### Pattern 3: Locale Context

```tsx
"use client";

import { useTranslationsContext } from "@/providers/translation-provider/client";

export function LocaleDisplay() {
  const { locale } = useTranslationsContext();

  return <div>Current locale: {locale}</div>;
}
```

### Translation File Structure

```json
// messages/en.json
{
  "app-layout": {
    "welcome": "Welcome",
    "greeting": "Hello, {{userName}}!",
    "menu-portal": "Portal",
    "menu-dashboard": "Dashboard"
  },
  "table": {
    "pagination": "Showing {{start}} to {{end}} of {{total}} entries",
    "pagination-empty": "No entries found"
  }
}
```

```json
// messages/th.json
{
  "app-layout": {
    "welcome": "ยินดีต้อนรับ",
    "greeting": "สวัสดี, {{userName}}!",
    "menu-portal": "พอร์ทัล",
    "menu-dashboard": "แดชบอร์ด"
  },
  "table": {
    "pagination": "แสดง {{start}} ถึง {{end}} จาก {{total}} รายการ",
    "pagination-empty": "ไม่พบรายการ"
  }
}
```

---

## Custom Hooks Library

### Navigation Hook

```tsx
// hooks/use-navigation.ts
"use client";
"use memo";

import { useRouter, usePathname } from "next/navigation";
import type { Route } from "next";

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (url: Route | string, options?: { scroll?: boolean }, isPush: boolean = true) => {
    // If URL starts with '?', preserve the current pathname
    let finalUrl = url;
    if (url.startsWith("?")) {
      finalUrl = url === "?" ? pathname : `${pathname}${url}`;
    }

    if (isPush) {
      router.push(finalUrl as Route, options);
    } else {
      router.replace(finalUrl as Route, options);
    }
  };

  return {
    navigate,
    pathname,
    push: (url: Route | string, options?: { scroll?: boolean }) => navigate(url, options, true),
    replace: (url: Route | string, options?: { scroll?: boolean }) => navigate(url, options, false),
  };
}
```

### Pagination Hook

```tsx
// hooks/use-pagination.ts
"use client";
"use memo";

import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  total: number;
}

export function usePagination({ initialPage = 0, initialPageSize = 10, total }: UsePaginationProps) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = Math.ceil(total / pageSize);
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page
  };

  return {
    page,
    pageSize,
    pageCount,
    start,
    end,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
  };
}
```

### Date Formatting Hook

```tsx
// hooks/use-format-date.ts
"use client";
"use memo";

import dayjs from "dayjs";
import { useTranslationsContext } from "@/providers/translation-provider/client";

export function useFormatDate() {
  const { locale } = useTranslationsContext();

  const formatDate = (date: string | Date, format: string = "DD/MM/YYYY") => {
    return dayjs(date).locale(locale).format(format);
  };

  const formatDateTime = (date: string | Date) => {
    return dayjs(date).locale(locale).format("DD/MM/YYYY HH:mm");
  };

  const formatRelative = (date: string | Date) => {
    return dayjs(date).locale(locale).fromNow();
  };

  return {
    formatDate,
    formatDateTime,
    formatRelative,
  };
}
```

### Fullscreen Container Hook

```tsx
// hooks/use-fullscreen-container.ts
"use client";

import { useContext } from "react";
import { FullscreenContext } from "@/providers/fullscreen-provider";

export function useFullscreenContainer() {
  const context = useContext(FullscreenContext);
  return context?.containerRef?.current || undefined;
}
```

---

## Query Parameter Management

### Native URLSearchParams Pattern

The codebase uses **native URLSearchParams** for query parameter management (not nuqs).

```tsx
// features/portal/_hooks/use-portal-filter.tsx
"use client";
"use memo";

import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/use-navigation";

export function usePortalFilter() {
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();

  // Get current filter values
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Update search params helper
  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    navigate(`?${params.toString()}`, { scroll: false });
  };

  // Individual setters
  const setSearch = (value: string) => {
    updateSearchParams({ search: value, page: "1" }); // Reset to page 1
  };

  const setCategory = (value: string) => {
    updateSearchParams({ category: value, page: "1" });
  };

  const setStatus = (value: string) => {
    updateSearchParams({ status: value, page: "1" });
  };

  const setPage = (value: number) => {
    updateSearchParams({ page: value.toString() });
  };

  const clearFilters = () => {
    navigate("?", { scroll: false }); // Clear all params
  };

  return {
    // Current values
    search,
    category,
    status,
    page,
    // Setters
    setSearch,
    setCategory,
    setStatus,
    setPage,
    clearFilters,
    // Bulk update
    updateSearchParams,
  };
}
```

### Usage in Components

```tsx
// features/portal/index.tsx
"use client";

import { usePortalFilter } from "./_hooks/use-portal-filter";

export default function PortalPage() {
  const filters = usePortalFilter();

  return (
    <div>
      <input value={filters.search} onChange={(e) => filters.setSearch(e.target.value)} placeholder="Search..." />

      <select value={filters.category} onChange={(e) => filters.setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <button onClick={filters.clearFilters}>Clear Filters</button>

      <ProductList search={filters.search} category={filters.category} page={filters.page} />
    </div>
  );
}
```

---

## Table Components

### DataGrid Integration

The project uses MUI X DataGrid with custom pagination and locale support.

```tsx
// components/table/index.tsx
"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslations, useTranslationsContext } from "@/providers/translation-provider/client";
import { useFullscreenContainer } from "@/hooks/use-fullscreen-container";
import { CustomSortIcon } from "./custom-sort-icon";
import { thaiLocaleText } from "./utils";

interface TableProps {
  columns: GridColDef[];
  rows: any[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}

export function Table({ columns, rows, page, pageSize, total, onPageChange, onPageSizeChange, loading = false }: TableProps) {
  const tableT = useTranslations("table");
  const { locale } = useTranslationsContext();
  const container = useFullscreenContainer();

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      pagination
      paginationMode="server"
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={(model) => {
        if (model.page !== page) onPageChange(model.page);
        if (model.pageSize !== pageSize) onPageSizeChange(model.pageSize);
      }}
      rowCount={total}
      pageSizeOptions={[10, 25, 50, 100]}
      disableRowSelectionOnClick
      localeText={locale === "th" ? thaiLocaleText : undefined}
      slots={{
        columnSortedAscendingIcon: CustomSortIcon,
        columnSortedDescendingIcon: CustomSortIcon,
      }}
      slotProps={{
        basePopper: {
          container: container,
        },
      }}
      sx={{
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
      }}
    />
  );
}
```

### Custom Pagination Component

```tsx
// components/table/custom-pagination.tsx
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { useTranslations } from "@/providers/translation-provider/client";
import { useFullscreenContainer } from "@/hooks/use-fullscreen-container";

interface CustomPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function CustomPagination({ page, pageSize, total, onPageChange, onPageSizeChange }: CustomPaginationProps) {
  const tableT = useTranslations("table");
  const container = useFullscreenContainer();

  const pageCount = Math.ceil(total / pageSize);
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  const displayText = total === 0 ? tableT("pagination-empty") : tableT("pagination", { start, end, total });

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2} width="100%">
      <Box display="flex" alignItems="center">
        <Select<number> value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} size="small" MenuProps={{ container: container }}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {displayText}
      </Typography>

      <Pagination count={pageCount} page={page + 1} onChange={(_, newPage) => onPageChange(newPage - 1)} color="primary" showFirstButton showLastButton />
    </Box>
  );
}
```

---

## Authentication & Routing

### Middleware Pattern

```typescript
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppConfig } from "./app-config";
import { TOKEN_COOKIE_NAME } from "./constant/common";

const basePath = AppConfig.BASE_PATH;

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isBasePathRoute = pathname.startsWith(basePath);

  // Redirect to login if no token
  if (!token && isBasePathRoute) {
    const loginUrl = new URL(`${basePath}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to base path if already logged in
  if (token && isBasePathRoute) {
    return NextResponse.redirect(new URL(`${basePath}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### Protected Routes

```tsx
// app/(main)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TOKEN_COOKIE_NAME } from "@/constant/common";
import { AppConfig } from "app-config";

export default async function MainLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    redirect(`${AppConfig.BASE_PATH}/login`);
  }

  return <>{children}</>;
}
```

---

## Performance Optimization

### React Compiler (Annotation Mode)

**Configuration:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: {
    compilationMode: "annotation", // Only compile components with 'use memo'
  },
};
```

**Usage Guidelines:**

✅ **Use `'use memo'` for:**

- Components with expensive computations
- Components that render frequently (e.g., table rows, list items)
- Components with complex prop transformations
- Custom hooks with heavy logic
- Filter/search components

❌ **Don't use `'use memo'` for:**

- Simple presentational components
- Server Components (not applicable)
- Components that rarely re-render
- One-time rendered components

**Example:**

```tsx
"use client";
"use memo"; // React Compiler opt-in

export function ExpensiveDataTable({ data }) {
  // Automatically memoized by React Compiler
  const processedData = data.map((item) => ({
    ...item,
    computed: expensiveCalculation(item),
  }));

  return <DataGrid rows={processedData} />;
}
```

### Code Splitting

```tsx
import dynamic from "next/dynamic";

// Dynamic import with loading state
const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Disable SSR for client-only components
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart data={chartData} />
    </div>
  );
}
```

### Image Optimization

```tsx
import Image from "next/image";

export function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      quality={75} // Default quality
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
    />
  );
}
```

---

## Testing Standards

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Test Setup

```typescript
// test/setup.ts
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

### Component Testing

```tsx
// components/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test -- --coverage

# Run specific test file
pnpm test button.test.tsx
```

---

## File Naming Conventions

### General Rules

| Type               | Convention                  | Example                                  |
| ------------------ | --------------------------- | ---------------------------------------- |
| **Components**     | PascalCase                  | `ProductCard.tsx`, `UserProfile.tsx`     |
| **Hooks**          | camelCase with `use` prefix | `use-navigation.ts`, `use-pagination.ts` |
| **Utilities**      | kebab-case                  | `fetch-api.ts`, `date-helpers.ts`        |
| **Types**          | kebab-case                  | `product-types.ts`, `api-types.ts`       |
| **Constants**      | kebab-case                  | `api-config.ts`, `route-config.ts`       |
| **Server Actions** | kebab-case                  | `fetch-products.ts`, `create-user.ts`    |
| **Tests**          | Same as source + `.test`    | `button.test.tsx`, `utils.test.ts`       |
| **Styles**         | kebab-case                  | `styles.module.css`, `global.css`        |

### Directory Naming

| Type             | Convention        | Example                                         |
| ---------------- | ----------------- | ----------------------------------------------- |
| **Features**     | kebab-case        | `portal/`, `dashboard/`, `user-management/`     |
| **Components**   | kebab-case        | `app-layout/`, `table-view/`, `filter-popover/` |
| **Private dirs** | Underscore prefix | `_components/`, `_hooks/`, `_libs/`             |
| **Route groups** | Parentheses       | `(main)/`, `(auth)/`                            |

### File Organization Examples

```plaintext
✅ GOOD
features/
├── portal/
│   ├── index.tsx
│   ├── _components/
│   │   ├── table-layout.tsx
│   │   └── filter-section.tsx
│   ├── _hooks/
│   │   └── use-portal-filter.tsx
│   ├── actions/
│   │   └── fetch-applications.ts
│   ├── config.ts
│   └── type.ts

❌ BAD
features/
├── Portal/                    # Should be lowercase
│   ├── Index.tsx             # Should be lowercase
│   ├── components/           # Should use underscore prefix
│   │   ├── TableLayout.tsx   # Inconsistent with directory
│   │   └── FilterSection.tsx
│   ├── hooks/                # Should use underscore prefix
│   │   └── usePortalFilter.tsx  # Should be kebab-case
│   ├── fetchApplications.ts  # Should be in actions/ directory
│   ├── Config.ts             # Should be lowercase
│   └── Types.ts              # Should be lowercase
```

---

## Code Quality & Linting

### ESLint Configuration

```bash
# Lint all files
pnpm lint

# Lint with auto-fix
pnpm lint --fix

# Type check
pnpm check-types
```

**Strict Rules:**

- `--max-warnings 0` - No warnings allowed
- TypeScript strict mode enabled
- Unused variables not allowed
- Console statements flagged in production

### Pre-commit Hooks

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix", "bash -c 'tsc --noEmit'"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### Code Formatting

```bash
# Format all files
pnpm format

# Format specific files
pnpm format src/components/**/*.tsx
```

---

## Best Practices Summary

### Component Development

1. ✅ Default to Server Components
2. ✅ Use `'use client'` only when necessary
3. ✅ Apply `'use memo'` to expensive components
4. ✅ Use compound patterns for complex layouts
5. ✅ Keep components focused and single-purpose
6. ✅ Use TypeScript for all components

### State Management

1. ✅ Use Server Actions with `'use cache'` for server data
2. ✅ Use Zustand for global UI state
3. ✅ Use TanStack Query for client-side data fetching
4. ✅ Use React Hook Form for forms
5. ✅ Avoid prop drilling - use context when appropriate

### Data Fetching

1. ✅ Use `fetchApi` utility for all API calls
2. ✅ Implement proper error handling
3. ✅ Use cache tags for revalidation
4. ✅ Transform data in server actions, not components
5. ✅ Use cookie context pattern for authenticated requests

### Styling

1. ✅ Use Tailwind for layout and simple styles
2. ✅ Use MUI sx prop for theme-aware styling
3. ✅ Follow CSS layer order: theme → base → mui → components → utilities
4. ✅ Use CSS variables for global values
5. ✅ Keep styles co-located with components

### Performance

1. ✅ Use React Compiler annotation mode
2. ✅ Implement code splitting for large components
3. ✅ Optimize images with Next.js Image component
4. ✅ Use server-side caching with `'use cache'`
5. ✅ Minimize client-side JavaScript

### Testing

1. ✅ Write tests for critical business logic
2. ✅ Test user interactions, not implementation
3. ✅ Use Testing Library queries properly
4. ✅ Mock external dependencies
5. ✅ Maintain high test coverage for utilities

---

## Additional Resources

- **CLAUDE.md** - AI assistant development guidelines
- **FETCH_API.md** - Detailed API patterns and examples
- **README.md** - Quick start and development guide
- **Next.js Documentation** - https://nextjs.org/docs
- **Material-UI Documentation** - https://mui.com/material-ui/
- **TanStack Query Documentation** - https://tanstack.com/query/latest
- **React Hook Form Documentation** - https://react-hook-form.com/
- **Zod Documentation** - https://zod.dev/

---

## Version History

- **v2.0** (2026-01-14) - Complete rewrite based on actual codebase implementation
- **v1.0** (Previous) - Initial version (deprecated)

---

**Last Updated:** 2026-01-14
**Maintained By:** Green Passport Development Team
