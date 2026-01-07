# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Root Level Commands

- `pnpm dev` - Start all applications in development mode (uses Turborepo)
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Lint all applications and packages (max 0 warnings)
- `pnpm check-types` - Type check all TypeScript code across the monorepo
- `pnpm format` - Format all TypeScript and markdown files with Prettier

### Application-Specific Commands

Navigate to the specific app directory and use:

- `pnpm dev` - Start development server (port auto-assigned via Turborepo)
- `pnpm build` - Build the application
- `pnpm lint` - Lint with max 0 warnings
- `pnpm check-types` - Type check without emitting files

### Package-Specific Commands (UI Libraries)

Navigate to a package directory (e.g., `packages/mui-ui`):

- `pnpm generate:component` - Generate a new React component using Turborepo generators

## Architecture Overview

This is a **Turborepo microfrontends monorepo** with three applications and shared UI packages. The architecture enables independent deployment of microfrontends while sharing common components and configurations.

### Monorepo Structure

- `apps/web` - Next.js 16 application (port 3000, host application)
- `apps/docs` - Next.js 16 application (port 3001, basePath: `/docs`)
- `apps/admin` - Vite + React application (port 3002, basePath: `/admin`)
- `packages/mui-ui` - Material-UI v7 component library with Emotion styling
- `packages/example-ui` - Example React component library
- `packages/eslint-config` - Shared ESLint configurations (base, next-js, react-internal)
- `packages/typescript-config` - Shared TypeScript configurations

### Microfrontends Configuration

Microfrontends are configured in `apps/web/microfrontends.json`:

- `web` runs on port 3000 (host/main application)
- `docs` runs on port 3001 with routing `/docs/:path*`
- `admin` runs on port 3002 with routing `/admin/:path*`

Port assignment is handled automatically via `turbo get-mfe-port` in dev scripts.

### Technology Stack

- **Package Manager**: pnpm with workspaces
- **Build System**: Turborepo 2.6.1 for task orchestration
- **Next.js Apps**: Next.js 16.1.1 with React 19
- **Vite App**: Vite 7 with React 19 and React Router 7
- **UI Framework**: Material-UI v7 with Emotion (@emotion/react, @emotion/styled)
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
- Next.js apps use `next lint` while Vite app uses standalone ESLint
- The admin app uses Vite with SWC for faster builds
- Material-UI components are in a separate package for reuse across apps

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
