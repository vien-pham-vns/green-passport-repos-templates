# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

## Development Commands

### Root Level Commands

- `pnpm dev` - Start all applications in development mode (uses Turborepo)
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Lint all applications and packages (max 0 warnings)
- `pnpm check-types` - Type check all TypeScript code across the monorepo
- `pnpm format` - Format all TypeScript and markdown files with Prettier

### Application-Specific Commands

Navigate to the specific app directory (e.g., `apps/gpass-portal`) and use:

- `pnpm dev` - Start development server
- `pnpm build` - Build the application
- `pnpm lint` - Lint with max 0 warnings
- `pnpm check-types` - Type check without emitting files
- `pnpm test` - Run tests using Vitest
- `pnpm test:watch` - Run tests in watch mode

### Package-Specific Commands (UI Libraries)

Navigate to a package directory (e.g., `packages/mui-ui`):

- `pnpm generate:component` - Generate a new React component using Turborepo generators

## Architecture Overview

This is a **Turborepo microfrontends monorepo** for Green Passport applications with shared UI packages. The architecture enables independent deployment of microfrontends while sharing common components and configurations.

### Monorepo Structure

- `apps/gpass-portal` - Green Passport government portal (Next.js 16 with App Router)
- `packages/mui-ui` - Material-UI v7 component library with Emotion styling
- `packages/devtools` - Development utilities and tools
- `packages/eslint-config` - Shared ESLint configurations (base, next-js, react-internal)
- `packages/typescript-config` - Shared TypeScript configurations

### Green Passport Portal (`apps/gpass-portal`)

A Next.js 16 dashboard application for tracking durian supply chain operations.

**Key Features:**

- **Dashboard Analytics**: Supply chain metrics and data visualizations
- **GAP Harvest Logs**: Geographic tracking with heatmaps using Google Maps
- **Fraud Risk Detection**: Alert system with configurable rule engine
- **QR Code Management**: Generation and tracking for products
- **Shipment Tracking**: End-to-end supply chain visibility
- **User Management**: Role-based access control (RBAC)
- **Settings**: Configurable alerts and fraud detection rules
- **Internationalization**: Thai/English language support

### Microfrontends Configuration

Microfrontends are configured in `apps/web/microfrontends.json`:

- `web` runs on port 3000 (host/main application)
- `docs` runs on port 3001 with routing `/docs/:path*`
- `admin` runs on port 3002 with routing `/admin/:path*`

Port assignment is handled automatically via `turbo get-mfe-port` in dev scripts.

### Technology Stack

- **Package Manager**: pnpm with workspaces (v10.16.1)
- **Build System**: Turborepo 2.6.1 for task orchestration
- **Framework**: Next.js 16.1.1 with App Router and React 19
- **UI Framework**: Material-UI v7 with Emotion (@emotion/react, @emotion/styled)
- **State Management**: Zustand for global state, TanStack Query (React Query) for server state
- **Forms**: React Hook Form v7.71.0 with Zod v4.3.5 validation
- **Maps**: Google Maps with advanced clustering
- **Charts**: ECharts v5.6.0 for data visualization
- **Analytics**: PostHog v1.310.1 for product analytics
- **Testing**: Vitest v4 with React Testing Library
- **TypeScript**: 5.9.2 across all packages
- **Node**: >=18 required

### Workspace Dependencies

Packages use workspace protocol:

- `@dt/mui-ui` - Material-UI components
- `@dt/example-ui` - Example components
- `@dt/eslint-config` - ESLint configurations
- `@dt/typescript-config` - TypeScript configurations

### Component Export Pattern

UI packages use path-based exports:

```json
"exports": {
  "./*": "./src/*.tsx"
}
```

Components are imported as: `import Button from '@dt/mui-ui/button'`

### Turborepo Task Pipeline

- `build` task depends on upstream builds (`^build`), outputs to `.next/`
- `lint` and `check-types` tasks depend on upstream completions
- `dev` task is persistent and does not cache

### Base Paths

- **docs app**: Uses `/docs` basePath (Next.js config)
- **admin app**: Uses `/admin` base (Vite config)
- **web app**: No basePath (root application)

### Development Workflow

1. Run `pnpm install` to install all dependencies
2. Run `pnpm dev` from root to start all apps simultaneously
3. Each app runs on its designated port with automatic routing
4. Shared packages are linked via workspace protocol
5. Changes to shared packages trigger rebuilds in consuming apps

### Important Notes

- ESLint enforces `--max-warnings 0` across all apps
- TypeScript strict checking is enabled via `check-types` scripts
- Next.js apps use `next lint` for linting
- Material-UI components are in a separate package for reuse across apps
- Husky pre-commit hooks run lint-staged for code quality
- Docker support available with standalone output configuration

## Green Passport Portal Architecture

### Project Structure

```plaintext
apps/gpass-portal/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable UI components
│   ├── body/             # Page-specific components and business logic
│   ├── services/         # API service functions
│   ├── hooks/            # Custom React hooks and React Query hooks
│   ├── store/            # Zustand state management stores
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions and helpers
├── messages/             # i18n JSON files (Thai/English)
├── public/               # Static assets
└── test/                 # Test configuration and setup
```

### Configuration Files

- **next.config.ts**: Next.js configuration with base path and output settings
- **instrumentation-client.ts**: Client-side instrumentation (PostHog analytics)
- **Dockerfile**: Production container configuration
- **.env**: Environment variables (API URLs, feature flags)
- **postcss.config.mjs**: PostCSS with Tailwind CSS v4
- **vitest.config.ts**: Test configuration with jsdom environment

### State Management Patterns

**Zustand Stores (`src/store/`)**

Use Zustand for global client state like:

- Authentication state
- UI state (sidebar open/close, theme)
- Temporary form data
- Global notifications

**TanStack Query (`src/hooks/queries/`)**

Use React Query hooks for server state including:

- Data fetching with automatic caching
- Mutations with optimistic updates
- Background refetching
- Cache invalidation after mutations

**Example Pattern:**

```typescript
// src/store/auth-store.ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// src/hooks/queries/use-products.ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";

export function useProducts(params: ProductParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Internationalization

The portal uses server-side cookie-based locale detection with:

- **messages/en.json**: English translations
- **messages/th.json**: Thai translations

Access translations in Server Components via `next-intl` utilities.

## Green Passport API Patterns

### Server Actions with Caching (`"use cache"`)

The portal uses Next.js 16's `"use cache"` directive for server-side caching. This pattern is critical for optimizing API calls.

**Feature-Based Structure:**

```plaintext
src/
└── features/
    └── container/
        ├── actions.ts      # Server actions with caching
        ├── config.ts       # Cache tags and constants
        ├── type.ts         # TypeScript types
        └── components/     # Feature components
```

**Server Action Pattern:**

```typescript
// src/features/container/actions.ts
"use server";

import { cacheLife, revalidateTag } from "next/cache";
import { apiCore } from "services/common";
import { type CookieContext, fetchApi, getCookieContext } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";
import { CONTAINER_CACHE_TAG } from "./config";
import { Container, ContainerItem, ContainerTableParams, ContainerTableResponse } from "./type";

/**
 * Get container list with server-side caching
 * Public function that handles cookie context
 */
export async function getContainerServerSide(params?: ContainerTableParams) {
  const ctx = await getCookieContext();
  return getContainerCached(ctx, params);
}

/**
 * Cached function with "use cache" directive
 * IMPORTANT: Must be a separate function from the public export
 */
async function getContainerCached(ctx: CookieContext, params?: ContainerTableParams) {
  "use cache";
  cacheLife("seconds"); // Cache lifetime configuration

  const url = apiCore("/doa/container", "v1");

  const response = await fetchApi<ContainerTableResponse>(url, {
    ...ctx,
    method: "GET",
    params: params as QueryParamsFilter,
    cacheTags: [CONTAINER_CACHE_TAG], // Tag for cache invalidation
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

/**
 * Revalidate container list cache
 * Call this after mutations to refresh the cached data
 */
export async function revalidateContainerList() {
  "use server";
  revalidateTag(CONTAINER_CACHE_TAG, { expire: 0 });
}
```

**Cache Configuration:**

```typescript
// src/features/container/config.ts
export const CONTAINER_CACHE_TAG = "container-list";
```

**Key Principles:**

1. **Separate Public and Cached Functions**: The public function (`getContainerServerSide`) gets the cookie context, while the internal function (`getContainerCached`) has the `"use cache"` directive
2. **Cache Tags**: Use descriptive cache tags (e.g., `CONTAINER_CACHE_TAG`) for targeted revalidation
3. **Cache Lifetime**: Use `cacheLife()` to control how long data is cached
4. **Revalidation**: Provide revalidation functions to clear cache after mutations
5. **Type Safety**: Use TypeScript types for params, responses, and transformed data

### Form Submission Patterns

**React Hook Form + Zod Validation:**

```typescript
// src/features/products/components/product-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useActionState } from "react";
import { createProduct } from "../actions";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [state, formAction, isPending] = useActionState(createProduct, null);

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);

    await formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Product Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("price", { valueAsNumber: true })} type="number" placeholder="Price" />
      {errors.price && <span>{errors.price.message}</span>}

      <select {...register("category")}>
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      {errors.category && <span>{errors.category.message}</span>}

      <button type="submit" disabled={isSubmitting || isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </button>

      {state?.success && <p>Product created successfully!</p>}
      {state?.error && <p>Error: {state.error}</p>}
    </form>
  );
}
```

**Server Action for Mutations:**

```typescript
// src/features/products/actions.ts
"use server";

import { revalidateTag } from "next/cache";
import { apiCore } from "services/common";
import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { PRODUCTS_CACHE_TAG } from "./config";

export async function createProduct(prevState: any, formData: FormData) {
  const ctx = await getCookieContext();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;

  try {
    const url = apiCore("/products", "v1");

    const response = await fetchApi(url, {
      ...ctx,
      method: "POST",
      body: JSON.stringify({ name, price, category }),
      logLabel: "CreateProduct",
    });

    // Revalidate cache after successful mutation
    revalidateTag(PRODUCTS_CACHE_TAG);

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### Component Patterns (Composition & Compound)

**Type-Safe Compound Components:**

```typescript
// src/components/ui/card.tsx
import { createContext, useContext } from "react";

type CardContextValue = {
  variant?: "outlined" | "elevated";
};

const CardContext = createContext<CardContextValue | null>(null);

function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card compound components must be used within Card");
  }
  return context;
}

export function Card({
  children,
  variant = "elevated"
}: {
  children: React.ReactNode;
  variant?: "outlined" | "elevated";
}) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`card card-${variant}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  const { variant } = useCardContext();
  return <div className={`card-header card-header-${variant}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>;
}

export function CardActions({ children }: { children: React.ReactNode }) {
  return <div className="card-actions">{children}</div>;
}

// Export as namespace for better DX
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;
```

**Usage:**

```typescript
import { Card } from "@/components/ui/card";

export function ProductCard({ product }) {
  return (
    <Card variant="outlined">
      <Card.Header>
        <h3>{product.name}</h3>
      </Card.Header>
      <Card.Content>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </Card.Content>
      <Card.Actions>
        <button>Buy Now</button>
      </Card.Actions>
    </Card>
  );
}
```

**Reference:** [Building Type-Safe Compound Components](https://tkdodo.eu/blog/building-type-safe-compound-components)

## Next.js Implementation Patterns (React 19 & RSC)

The Next.js applications (`apps/web` and `apps/docs`) use Next.js 16 with React 19, focusing on React Server Components (RSC) and modern patterns.

### React Server Components (RSC) Patterns

**Default to Server Components:**

- All components in `app/` are Server Components by default
- Only add `"use client"` when necessary (interactivity, hooks, browser APIs)
- Server Components can directly fetch data, access databases, read files

**Example - Server Component with Data Fetching:**

```tsx
// app/products/page.tsx
// This is a Server Component (default)
async function ProductsPage() {
  const products = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 }, // Revalidate every hour
  }).then((res) => res.json());

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}
```

**Server/Client Component Boundaries:**

```tsx
// app/dashboard/page.tsx (Server Component)
import { ClientCounter } from "./client-counter";
import { getUser } from "@/lib/auth";

export default async function Dashboard() {
  const user = await getUser(); // Server-side data fetching

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <ClientCounter initialCount={user.visits} /> {/* Client Component */}
    </div>
  );
}

// app/dashboard/client-counter.tsx
("use client");
import { useState } from "react";

export function ClientCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

### React 19 Features

**Server Actions:**

```tsx
// app/actions/user.ts
"use server";

import { revalidatePath } from "next/cache";

export async function updateUser(formData: FormData) {
  const name = formData.get("name") as string;

  // Update database
  await db.user.update({ name });

  // Revalidate the page
  revalidatePath("/profile");

  return { success: true };
}
```

**useActionState (React 19):**

```tsx
// app/profile/edit-form.tsx
"use client";

import { useActionState } from "react";
import { updateUser } from "@/app/actions/user";

export function EditForm({ user }) {
  const [state, formAction, isPending] = useActionState(updateUser, null);

  return (
    <form action={formAction}>
      <input name="name" defaultValue={user.name} />
      <button disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
      {state?.success && <p>Saved successfully!</p>}
    </form>
  );
}
```

**useFormStatus (React 19):**

```tsx
// app/components/submit-button.tsx
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

// Usage in form
// app/contact/form.tsx
("use client");

export function ContactForm({ action }) {
  return (
    <form action={action}>
      <input name="email" />
      <SubmitButton />
    </form>
  );
}
```

**useOptimistic (React 19):**

```tsx
// app/todos/todo-list.tsx
"use client";

import { useOptimistic } from "react";
import { addTodo } from "@/app/actions/todos";

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo: string) => [...state, { id: Date.now(), text: newTodo, pending: true }]);

  async function handleSubmit(formData: FormData) {
    const todo = formData.get("todo") as string;
    addOptimisticTodo(todo);
    await addTodo(formData);
  }

  return (
    <>
      <form action={handleSubmit}>
        <input name="todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

**use() Hook (React 19):**

```tsx
// app/user/[id]/page.tsx
import { use } from "react";

async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

export default function UserPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap promises with use()
  const { id } = use(params);
  const user = use(getUser(id));

  return <h1>{user.name}</h1>;
}
```

### Cache API and Data Fetching

**fetch with Cache Options:**

```tsx
// Force cache (default)
fetch("https://api.example.com/data", { cache: "force-cache" });

// No caching
fetch("https://api.example.com/data", { cache: "no-store" });

// Revalidate after time
fetch("https://api.example.com/data", {
  next: { revalidate: 60 }, // 60 seconds
});

// Tag-based revalidation
fetch("https://api.example.com/products", {
  next: { tags: ["products"] },
});
```

**React cache() for Request Memoization:**

```tsx
// lib/data.ts
import { cache } from "react";

// React cache deduplicates requests during a single render pass
export const getUser = cache(async (id: string) => {
  console.log("Fetching user:", id); // Only logs once per request
  const user = await db.user.findUnique({ where: { id } });
  return user;
});

export const getUserPosts = cache(async (userId: string) => {
  const posts = await db.post.findMany({ where: { userId } });
  return posts;
});

// Usage in Server Component
// app/user/[id]/page.tsx
import { getUser, getUserPosts } from "@/lib/data";

export default async function UserPage({ params }) {
  const { id } = await params;

  // Even if getUser(id) is called multiple times in different components,
  // it will only execute once per request
  const user = await getUser(id);
  const posts = await getUserPosts(id);

  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
}

// app/user/[id]/layout.tsx
import { getUser } from "@/lib/data";

export default async function UserLayout({ params, children }) {
  const { id } = await params;
  const user = await getUser(id); // Reuses cached result from page.tsx

  return (
    <div>
      <UserNav userName={user.name} />
      {children}
    </div>
  );
}
```

**Combining fetch Cache + React cache:**

```tsx
// lib/api.ts
import { cache } from "react";

// Combines React cache (request deduplication) with fetch cache (HTTP caching)
export const getProducts = cache(async () => {
  const res = await fetch("https://api.example.com/products", {
    next: {
      revalidate: 3600, // HTTP cache: revalidate every hour
      tags: ["products"],
    },
  });
  return res.json();
});

export const getProduct = cache(async (id: string) => {
  // No-store for dynamic data
  const res = await fetch(`https://api.example.com/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
});

// For database queries (non-fetch)
export const getUserWithStats = cache(async (id: string) => {
  const [user, stats] = await Promise.all([db.user.findUnique({ where: { id } }), db.stats.findUnique({ where: { userId: id } })]);
  return { ...user, stats };
});
```

**Revalidation Functions:**

```tsx
// app/actions/products.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createProduct(formData: FormData) {
  // Create product
  await db.product.create({
    data: {
      /*...*/
    },
  });

  // Revalidate specific path
  revalidatePath("/products");

  // Or revalidate by tag
  revalidateTag("products");
}

// Revalidate layout and nested pages
revalidatePath("/products", "layout");

// Revalidate specific page only
revalidatePath("/products", "page");
```

**Route Segment Config:**

```tsx
// app/dashboard/page.tsx
export const dynamic = "force-dynamic"; // SSR on every request
export const revalidate = 3600; // ISR: revalidate every hour
export const fetchCache = "default-cache";
export const runtime = "nodejs"; // or 'edge'

export default async function DashboardPage() {
  // This page will revalidate every hour
  const data = await fetch("https://api.example.com/data");
  return <div>{/* ... */}</div>;
}
```

### Query Params Patterns

**Server Component - Native searchParams:**

```tsx
// app/products/page.tsx
type SearchParams = Promise<{
  category?: string;
  sort?: string;
  page?: string;
}>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = params.category ?? "all";
  const sort = params.sort ?? "newest";
  const page = parseInt(params.page ?? "1", 10);

  // Fetch based on query params
  const products = await getProducts({ category, sort, page });

  return (
    <div>
      <h1>Products - {category}</h1>
      <ProductFilters />
      <ProductList products={products} />
    </div>
  );
}
```

**Client Component - Native useSearchParams:**

```tsx
// app/products/filters.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const setCategory = (category: string) => {
    router.push(pathname + "?" + createQueryString("category", category));
  };

  const setSort = (sort: string) => {
    router.push(pathname + "?" + createQueryString("sort", sort));
  };

  return (
    <div>
      <select value={searchParams.get("category") ?? "all"} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <select value={searchParams.get("sort") ?? "newest"} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
```

**Type-Safe Query Params with nuqs:**

```tsx
// app/products/search-params.ts
import { createSearchParamsCache, parseAsString, parseAsInteger } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  category: parseAsString.withDefault("all"),
  sort: parseAsString.withDefault("newest"),
  page: parseAsInteger.withDefault(1),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
});

// app/products/page.tsx
import { searchParamsCache } from "./search-params";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  // Type-safe parsing with defaults
  const { category, sort, page, minPrice, maxPrice } = await searchParamsCache.parse(searchParams);

  const products = await getProducts({
    category,
    sort,
    page,
    priceRange: minPrice && maxPrice ? { min: minPrice, max: maxPrice } : undefined,
  });

  return (
    <div>
      <h1>Products - {category}</h1>
      <ProductFilters />
      <ProductList products={products} currentPage={page} />
    </div>
  );
}
```

**Client-Side nuqs Hooks:**

```tsx
// app/products/filters-nuqs.tsx
"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

export function ProductFiltersNuqs() {
  const [category, setCategory] = useQueryState("category", parseAsString.withDefault("all"));

  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("newest"));

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  );
}
```

**Multiple Query Params with nuqs:**

```tsx
// app/products/advanced-filters.tsx
"use client";

import { useQueryStates, parseAsString, parseAsInteger, parseAsArrayOf } from "nuqs";

export function AdvancedFilters() {
  const [filters, setFilters] = useQueryStates({
    category: parseAsString.withDefault("all"),
    brands: parseAsArrayOf(parseAsString).withDefault([]),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
    inStock: parseAsString,
  });

  const updateFilters = (updates: Partial<typeof filters>) => {
    setFilters(updates);
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      brands: [],
      minPrice: null,
      maxPrice: null,
      inStock: null,
    });
  };

  return (
    <div>
      <select value={filters.category} onChange={(e) => updateFilters({ category: e.target.value })}>
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
      </select>

      <input type="number" value={filters.minPrice ?? ""} onChange={(e) => updateFilters({ minPrice: parseInt(e.target.value) || null })} placeholder="Min Price" />

      <input type="number" value={filters.maxPrice ?? ""} onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) || null })} placeholder="Max Price" />

      <button onClick={clearFilters}>Clear All Filters</button>
    </div>
  );
}
```

**nuqs with Suspense (Recommended):**

```tsx
// app/products/layout.tsx
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function ProductsLayout({ children }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

// app/products/page.tsx
import { Suspense } from "react";
import { ProductFiltersNuqs } from "./filters-nuqs";

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFiltersNuqs />
      </Suspense>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
```

### Component Composition Patterns

**Composition Pattern (Preferred):**

```tsx
// app/components/card.tsx (Server Component)
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>;
}

// Usage - compose from smaller pieces
// app/products/product-card.tsx
import { Card, CardHeader, CardContent } from "@/components/card";

export function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <h3>{product.name}</h3>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
        <ProductPrice price={product.price} />
      </CardContent>
    </Card>
  );
}
```

**Facade Pattern for Hooks (Client Components):**

```tsx
// hooks/use-user-data.ts (Facade)
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import { usePreferences } from "./use-preferences";
import { useNotifications } from "./use-notifications";

// Facade that combines multiple hooks
export function useUserData() {
  const auth = useAuth();
  const preferences = usePreferences(auth.user?.id);
  const notifications = useNotifications(auth.user?.id);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (auth.isLoaded && preferences.isLoaded && notifications.isLoaded) {
      setIsReady(true);
    }
  }, [auth.isLoaded, preferences.isLoaded, notifications.isLoaded]);

  return {
    user: auth.user,
    preferences: preferences.data,
    notifications: notifications.data,
    isReady,
    refresh: () => {
      auth.refresh();
      preferences.refresh();
      notifications.refresh();
    },
  };
}

// Usage in Client Component
// app/dashboard/user-dashboard.tsx
("use client");

import { useUserData } from "@/hooks/use-user-data";

export function UserDashboard() {
  const { user, preferences, notifications, isReady } = useUserData();

  if (!isReady) return <Loading />;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <ThemeToggle theme={preferences.theme} />
      <NotificationBell count={notifications.unread} />
    </div>
  );
}
```

**Container/Presenter Pattern with RSC:**

```tsx
// app/products/page.tsx (Server Component - Container)
import { ProductList } from "./product-list";
import { getProducts } from "@/lib/data";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}

// app/products/product-list.tsx (Client Component - Presenter)
("use client");

import { useState } from "react";

export function ProductList({ products }) {
  const [filter, setFilter] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter products..." />
      <div>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
```

### Parallel Data Fetching

**Parallel Routes and Suspense:**

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

async function Revenue() {
  const data = await fetch("https://api.example.com/revenue");
  return <div>Revenue: {data.total}</div>;
}

async function Orders() {
  const data = await fetch("https://api.example.com/orders");
  return <div>Orders: {data.count}</div>;
}

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading revenue...</div>}>
        <Revenue />
      </Suspense>
      <Suspense fallback={<div>Loading orders...</div>}>
        <Orders />
      </Suspense>
    </div>
  );
}
```

**Promise.all for Parallel Fetching:**

```tsx
// app/user/[id]/page.tsx
export default async function UserPage({ params }) {
  const { id } = await params;

  // Fetch in parallel
  const [user, posts, comments] = await Promise.all([getUser(id), getUserPosts(id), getUserComments(id)]);

  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={posts} />
      <UserComments comments={comments} />
    </div>
  );
}
```

### Metadata API

**Static Metadata:**

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}
```

### Error Handling

**error.tsx (Error Boundaries):**

```tsx
// app/products/error.tsx
"use client";

export default function ProductsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**loading.tsx (Loading UI):**

```tsx
// app/products/loading.tsx
export default function ProductsLoading() {
  return <div>Loading products...</div>;
}
```

### Reference Examples

For implementation examples, refer to the official Next.js examples repository:

- **Base URL**: https://github.com/vercel/next.js/tree/canary/examples
- **App Router Examples**: https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing
- **Server Actions**: https://github.com/vercel/next.js/tree/canary/examples/server-actions
- **Forms**: https://github.com/vercel/next.js/tree/canary/examples/forms

### Key Principles for Next.js Development

1. **Server-First**: Default to Server Components, only use Client Components when needed
2. **Fetch at the Highest Level**: Fetch data in the page/layout, pass down as props
3. **Parallel Loading**: Use Promise.all and Suspense for parallel data fetching
4. **Cache Strategically**:
   - Use React's `cache()` for request memoization (deduplication)
   - Use fetch cache options (`revalidate`, `tags`) for HTTP caching
   - Combine both for optimal performance
5. **Composition Over Configuration**: Build UIs from smaller, composable components
6. **Type Safety**:
   - Leverage TypeScript for params, searchParams, and data structures
   - Use nuqs for type-safe query parameters with validation
7. **Progressive Enhancement**: Forms work without JavaScript using Server Actions
8. **Query Params Management**:
   - Use native `searchParams` in Server Components
   - Use `useSearchParams` for simple Client Component needs
   - Use `nuqs` for complex, type-safe query param management with multiple filters

## Green Passport Best Practices

### API Integration

**fetchApi Utility (`src/utils/fetch-api.ts`):**

The portal uses a centralized `fetchApi` utility that handles:

- Cookie-based authentication context
- Automatic request/response logging
- Error handling and retries
- Cache tag management
- TypeScript type inference

**Example:**

```typescript
import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { apiCore } from "services/common";

const ctx = await getCookieContext();
const url = apiCore("/doa/container", "v1");

const response = await fetchApi<ContainerTableResponse>(url, {
  ...ctx,
  method: "GET",
  params: { page: 1, limit: 10 },
  cacheTags: ["containers"],
  logLabel: "FetchContainers",
});
```

### Server Action Guidelines

1. **Always use `"use server"`** directive at the top of server action files
2. **Separate concerns**: Keep public functions and cached functions distinct
3. **Cookie context**: Always get cookie context before making authenticated requests
4. **Cache tags**: Use descriptive, feature-specific cache tags
5. **Revalidation**: Provide revalidation functions for each cacheable resource
6. **Error handling**: Return structured responses with success/error states
7. **Type safety**: Define TypeScript types for all params and responses

### Form Development Guidelines

1. **Validation**: Use Zod schemas for both client and server-side validation
2. **React Hook Form**: Leverage `useForm` with `zodResolver` for form management
3. **Server Actions**: Use `useActionState` for progressive enhancement
4. **Loading States**: Show loading indicators with `isPending` and `isSubmitting`
5. **Error Display**: Show field-level errors from React Hook Form
6. **Success Feedback**: Display success messages after successful submissions
7. **Optimistic Updates**: Use `useOptimistic` for immediate UI feedback

### Component Development Guidelines

1. **Composition**: Build complex components from smaller, reusable pieces
2. **Compound Components**: Use compound patterns for related component groups
3. **Type Safety**: Use TypeScript generics and strict typing
4. **Context**: Use React Context for compound component state sharing
5. **Server Components**: Default to Server Components, add `"use client"` only when needed
6. **Material-UI**: Import from `@dt/mui-ui` for shared components
7. **Styling**: Use Emotion CSS-in-JS or Tailwind CSS v4 utility classes

### State Management Guidelines

**When to use Zustand:**

- Global UI state (theme, sidebar, modals)
- Authentication state
- Temporary form data across routes
- User preferences

**When to use TanStack Query:**

- Server data fetching
- Data caching with automatic revalidation
- Mutations with cache invalidation
- Loading and error states for async operations

**When to use Server Actions with `"use cache"`:**

- Server-side data fetching with caching
- Authenticated API calls
- Database queries
- File system operations

### Testing Guidelines

1. **Vitest**: Use Vitest for unit and integration tests
2. **React Testing Library**: Test components from user perspective
3. **jsdom**: Tests run in jsdom environment
4. **Setup**: Test configuration in `test/setup.ts`
5. **Co-location**: Place tests near components when possible

### Deployment & Docker

The portal supports Docker deployment with standalone output:

```dockerfile
# Dockerfile example (see apps/gpass-portal/Dockerfile)
FROM node:18-alpine AS base
# Install dependencies, build, and run
```

**Environment Variables:**

- **NEXT_PUBLIC_API_URL**: API base URL
- **NEXT_PUBLIC_POSTHOG_KEY**: PostHog analytics key
- **NEXT_PUBLIC_GOOGLE_MAPS_KEY**: Google Maps API key

### File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Utilities**: kebab-case (e.g., `fetch-api.ts`)
- **Types**: kebab-case (e.g., `product-types.ts`)
- **Server Actions**: `actions.ts` within feature folders
- **Configuration**: `config.ts` within feature folders
- **Tests**: `*.test.tsx` or `*.spec.tsx`

### Code Organization

**Feature-Based Structure (Recommended):**

```plaintext
src/features/
├── container/
│   ├── actions.ts          # Server actions
│   ├── config.ts           # Constants and cache tags
│   ├── type.ts             # TypeScript types
│   ├── components/
│   │   ├── ContainerList.tsx
│   │   └── ContainerForm.tsx
│   └── hooks/
│       └── use-container.ts
```

**Shared Components:**

```plaintext
src/components/
├── ui/                      # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── layout/                  # Layout components
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

### Performance Optimization

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Use Next.js `<Image>` component
3. **Caching**: Leverage `"use cache"` for expensive operations
4. **Suspense**: Wrap async components in Suspense boundaries
5. **Memoization**: Use React's `cache()` for request deduplication
6. **Bundle Analysis**: Run `pnpm analyze` to check bundle sizes

### Security Best Practices

1. **Authentication**: Use cookie-based session management
2. **Authorization**: Implement role-based access control (RBAC)
3. **Input Validation**: Validate all user input with Zod
4. **XSS Prevention**: Sanitize user-generated content
5. **CSRF Protection**: Use Next.js built-in CSRF protection
6. **Environment Variables**: Never commit secrets, use `.env.local`
7. **API Security**: Validate authentication tokens on every request

## Additional Resources

- **FETCH_API.md**: Detailed API patterns and examples
- **README.md**: Quick start and development guide
- **apps/gpass-portal/CLAUDE.md**: Portal-specific implementation details
- **Next.js Documentation**: <https://nextjs.org/docs>
- **Material-UI Documentation**: <https://mui.com/material-ui/>
- **TanStack Query Documentation**: <https://tanstack.com/query/latest>
- **React Hook Form Documentation**: <https://react-hook-form.com/>
- **Zod Documentation**: <https://zod.dev/>

## Support & Contributing

For questions, issues, or contributions:

1. **Code Review**: All PRs require review before merging
2. **Pre-commit Hooks**: Husky runs linting and type checking
3. **Commit Messages**: Use conventional commits format
4. **Testing**: Write tests for new features and bug fixes
5. **Documentation**: Update CLAUDE.md when adding patterns or features
