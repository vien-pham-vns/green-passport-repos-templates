# Central Lab Portal Development Standards v3.0

> **Comprehensive development standards for the Central Lab Portal application**  
> Last Updated: 2026-01-15  
> Next.js 16 | React 19 | Shadcn/ui + Base UI | Tailwind CSS v4 | TypeScript 5.9

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Architecture](#project-architecture)
3. [Component Development Standards](#component-development-standards)
4. [Shadcn/ui + Base UI Patterns](#shadcnui--base-ui-patterns)
5. [Styling with Tailwind CSS v4](#styling-with-tailwind-css-v4)
6. [TypeScript Standards](#typescript-standards)
7. [File Naming & Organization](#file-naming--organization)
8. [State Management](#state-management)
9. [Data Fetching & Server Actions](#data-fetching--server-actions)
10. [Form Handling](#form-handling)
11. [Internationalization (i18n)](#internationalization-i18n)
12. [Performance Optimization](#performance-optimization)
13. [Accessibility Standards](#accessibility-standards)
14. [Testing Standards](#testing-standards)
15. [Code Quality & Linting](#code-quality--linting)
16. [Quick Reference](#quick-reference)

---

## Technology Stack

### Core Technologies

| Technology          | Version | Purpose                             |
| ------------------- | ------- | ----------------------------------- |
| **Node.js**         | >=18    | Runtime environment                 |
| **pnpm**            | 10.16.1 | Package manager                     |
| **TypeScript**      | 5.9.2   | Type safety                         |
| **React**           | 19.x    | UI library                          |
| **Next.js**         | 16.1.1  | React framework with App Router     |
| **Shadcn/ui**       | latest  | Component library (base-maia style) |
| **Base UI**         | latest  | Headless UI primitives              |
| **Tailwind CSS**    | v4.1.9  | Utility-first CSS framework         |
| **Lucide React**    | 0.454.0 | Icon library                        |
| **TanStack Query**  | 5.69.0  | Server state management             |
| **React Hook Form** | 7.60.0  | Form management                     |
| **Zod**             | 3.25.76 | Schema validation                   |
| **date-fns**        | 4.1.0   | Date manipulation                   |
| **Vitest**          | 4.x     | Testing framework                   |

### Key Features

- **React Server Components (RSC)** - Server-first rendering by default
- **React 19 Hooks** - `useActionState`, `useOptimistic`, `useFormStatus`, `use()`
- **Server Actions** - Type-safe server mutations
- **Tailwind CSS v4** - Modern CSS with `@theme` and `@custom-variant`
- **Base UI Primitives** - Headless components with `render` prop pattern
- **Shadcn/ui Integration** - Pre-built accessible components

---

## Project Architecture

### Application Structure

```plaintext
apps/central-lab-portal/
├── app/                       # Next.js App Router
│   ├── (auth)/               # Auth route group
│   │   └── login/
│   ├── (main)/               # Main app route group
│   │   ├── layout.tsx        # Main layout with sidebar
│   │   └── page.tsx          # Dashboard page
│   ├── actions/              # Server actions
│   ├── globals.css           # Global styles (Tailwind v4)
│   ├── layout.tsx            # Root layout
│   └── provider-layout.tsx   # Client providers wrapper
├── components/               # Shared UI components
│   ├── ui/                   # Shadcn/ui components
│   ├── app-sidebar.tsx       # Main sidebar
│   ├── app-sidebar-header.tsx
│   ├── app-sidebar-menu.tsx
│   ├── app-sidebar-footer.tsx
│   ├── notifications.tsx
│   └── path-breadcrumbs.tsx
├── features/                 # Feature modules
│   ├── login/
│   └── portal/
├── hooks/                    # Custom React hooks
├── lib/                      # Library configurations
├── providers/                # React context providers
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── data/                     # Static data & configurations
├── messages/                 # i18n translation files
│   ├── en.json
│   └── th.json
├── public/                   # Static assets
├── components.json           # Shadcn/ui configuration
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

### Route Groups

The application uses Next.js route groups for layout organization:

- **(auth)** - Authentication pages (login, register) with minimal layout
- **(main)** - Main application pages with sidebar and header

---

## Component Development Standards

### Component Types

#### 1. Server Components (Default)

All components in `app/` are Server Components by default. Use for:

- Pages that fetch data
- Layouts
- Static content
- SEO-critical content

```tsx
// app/(main)/dashboard/page.tsx
// Server Component (no "use client" directive)
export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardStats data={data} />
    </div>
  );
}
```

#### 2. Client Components

Add `"use client"` directive when you need:

- React hooks (`useState`, `useEffect`, etc.)
- Event handlers
- Browser APIs
- Third-party libraries that use hooks

```tsx
// components/notifications.tsx
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      <Bell />
    </button>
  );
}
```

### Component Organization Patterns

#### Pattern 1: Single Responsibility Components

Each component should have a single, clear purpose:

```tsx
// ✅ GOOD - Single responsibility
export function NotificationBell({ count }: { count: number }) {
  return (
    <button className="relative">
      <Bell className="h-5 w-5" />
      {count > 0 && <span className="absolute -top-1 -right-1 ...">{count}</span>}
    </button>
  );
}

// ❌ BAD - Multiple responsibilities
export function Header() {
  // Handles navigation, user menu, notifications, search, theme toggle...
  // Too many concerns in one component
}
```

#### Pattern 2: Component Composition

Break down complex components into smaller, composable pieces:

```tsx
// ✅ GOOD - Composed from smaller components
// components/app-sidebar.tsx
export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarMenu />
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}

// components/app-sidebar-header.tsx
export function AppSidebarHeader() {
  const { state } = useSidebar();
  return <SidebarHeader>{/* Header content */}</SidebarHeader>;
}

// components/app-sidebar-menu.tsx
export function AppSidebarMenu() {
  // Menu logic and rendering
}

// components/app-sidebar-footer.tsx
export function AppSidebarFooter({ user }: { user?: User }) {
  // Footer logic and rendering
}
```

#### Pattern 3: Compound Components

Use compound components for related UI elements:

```tsx
// components/ui/card.tsx
export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-lg border", className)}>{children}</div>;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("font-semibold", className)}>{children}</h3>;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

// Export as namespace
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

// Usage
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>;
```

---

## Shadcn/ui + Base UI Patterns

### Understanding the Architecture

The Central Lab Portal uses **Shadcn/ui** with **Base UI** primitives (not Radix UI). This is a critical distinction:

- **Base UI** provides headless, unstyled components
- **Shadcn/ui** provides styled implementations using Base UI
- Components use the `render` prop pattern (not `asChild`)

### Base UI Component Pattern

Base UI components use the `render` prop for composition:

```tsx
// ✅ CORRECT - Base UI pattern with render prop
import { Button as ButtonPrimitive } from "@base-ui/react/button";

<ButtonPrimitive
  render={<Link href="/dashboard" />}
  className="..."
>
  Go to Dashboard
</ButtonPrimitive>

// ❌ WRONG - Radix UI pattern (don't use)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Shadcn/ui Component Structure

All Shadcn/ui components follow this pattern:

```tsx
// components/ui/button.tsx
"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-4xl ...", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      outline: "border-border bg-input/30 hover:bg-input/50",
      ghost: "hover:bg-muted hover:text-foreground",
      destructive: "bg-destructive/10 text-destructive",
    },
    size: {
      default: "h-9 px-3",
      sm: "h-8 px-3",
      lg: "h-10 px-4",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({ className, variant = "default", size = "default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
```

### Using Shadcn/ui Components

#### Basic Usage

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click Me
</Button>;
```

#### With Icons

```tsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

<Button>
  <Plus className="h-4 w-4" />
  Add Item
</Button>;
```

#### As Link

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

<Button render={<Link href="/dashboard" />}>Go to Dashboard</Button>;
```

#### With Loading State

```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

<Button disabled={isLoading}>
  {isLoading && <Loader2 className="animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>;
```

### Common Shadcn/ui Components

#### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>;
```

#### Popover

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
  <PopoverContent>
    <p>Popover content</p>
  </PopoverContent>
</Popover>;
```

#### Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" />}>Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

---

## Styling with Tailwind CSS v4

### Tailwind CSS v4 Features

The Central Lab Portal uses **Tailwind CSS v4** with modern features:

#### 1. `@theme` Directive

Define theme tokens inline in CSS:

```css
/* app/globals.css */
@theme inline {
  --font-sans: var(--font-sans);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
  --radius-4xl: calc(var(--radius) + 16px);
}
```

#### 2. `@custom-variant` Directive

Create custom variants for dark mode:

```css
/* app/globals.css */
@custom-variant dark (&:is(.dark *));
```

Usage in components:

```tsx
<div className="bg-white dark:bg-gray-900">Content</div>
```

#### 3. CSS Variables for Theming

Define color schemes using CSS variables:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.87 0 0);
  --primary-foreground: oklch(0.205 0 0);
}
```

### Styling Best Practices

#### 1. Use Utility Classes

Prefer Tailwind utility classes over custom CSS:

```tsx
// ✅ GOOD - Utility classes
<div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
  Content
</div>

// ❌ BAD - Custom CSS
<div className="custom-container">
  Content
</div>
```

#### 2. Use `cn()` Helper for Conditional Classes

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-classes", isActive && "active-classes", variant === "primary" && "primary-classes")}>Content</div>;
```

#### 3. Consistent Spacing Scale

Use Tailwind's spacing scale consistently:

```tsx
// ✅ GOOD - Consistent spacing
<div className="p-4 gap-3 space-y-2">
  <div className="mb-4">Section 1</div>
  <div className="mb-4">Section 2</div>
</div>

// ❌ BAD - Arbitrary values
<div className="p-[17px] gap-[13px]">
  Content
</div>
```

#### 4. Responsive Design

Use responsive prefixes for mobile-first design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text */}
</div>
```

#### 5. Dark Mode Support

Always provide dark mode variants:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content
</div>

<div className="border border-gray-200 dark:border-gray-800">
  Content
</div>
```

---

## TypeScript Standards

### Type Safety Rules

#### 1. Explicit Type Annotations

Always provide explicit types for function parameters and return values:

```tsx
// ✅ GOOD - Explicit types
export function formatDate(date: Date, format: string): string {
  return format(date, format);
}

interface User {
  id: string;
  name: string;
  email: string;
}

export function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

// ❌ BAD - Implicit types
export function formatDate(date, format) {
  return format(date, format);
}
```

#### 2. Interface vs Type

Use `interface` for object shapes, `type` for unions and complex types:

```tsx
// ✅ GOOD - Interface for objects
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ✅ GOOD - Type for unions
export type UserRole = "admin" | "user" | "guest";

export type NotificationType = "success" | "warning" | "info" | "error";

// ✅ GOOD - Type for complex types
export type AsyncState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: Error };
```

#### 3. Avoid `any`

Never use `any`. Use `unknown` or proper types:

```tsx
// ✅ GOOD - Proper typing
function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return String(data);
}

// ❌ BAD - Using any
function processData(data: any): string {
  return data.toUpperCase();
}
```

#### 4. Generic Types

Use generics for reusable, type-safe components:

```tsx
// ✅ GOOD - Generic component
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <table>
      {data.map((row, index) => (
        <tr key={index} onClick={() => onRowClick?.(row)}>
          {/* Render columns */}
        </tr>
      ))}
    </table>
  );
}
```

### Type Organization

#### 1. Co-locate Types

Keep types close to where they're used:

```plaintext
components/
└── notifications.tsx
    ├── export type NotificationType = ...
    ├── export interface Notification = ...
    └── export function Notifications() { ... }
```

#### 2. Shared Types

Put shared types in `types/` directory:

```plaintext
types/
├── common.ts          # Common types used across app
├── user.ts            # User-related types
└── api.ts             # API response types
```

```tsx
// types/common.ts
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
```

#### 3. Component Props Types

Always define props interfaces:

```tsx
// ✅ GOOD - Explicit props interface
interface NotificationBellProps {
  count: number;
  onClick?: () => void;
  className?: string;
}

export function NotificationBell({ count, onClick, className }: NotificationBellProps) {
  return (
    <button className={className} onClick={onClick}>
      {count}
    </button>
  );
}

// ❌ BAD - Inline props
export function NotificationBell({ count, onClick }: { count: number; onClick?: () => void }) {
  return <button onClick={onClick}>{count}</button>;
}
```

---

## File Naming & Organization

### File Naming Conventions

#### 1. Component Files

Use **kebab-case** for all files:

```plaintext
✅ GOOD
components/
├── app-sidebar.tsx
├── app-sidebar-header.tsx
├── app-sidebar-menu.tsx
├── app-sidebar-footer.tsx
├── notifications.tsx
└── path-breadcrumbs.tsx

❌ BAD
components/
├── AppSidebar.tsx
├── AppSidebarHeader.tsx
├── Notifications.tsx
└── PathBreadcrumbs.tsx
```

#### 2. Component Names

Use **PascalCase** for component names:

```tsx
// ✅ GOOD
export function AppSidebar() {}
export function NotificationBell() {}
export function PathBreadcrumbs() {}

// ❌ BAD
export function appSidebar() {}
export function notification_bell() {}
```

#### 3. Utility Files

Use **kebab-case** for utility files:

```plaintext
utils/
├── fetch-api.ts
├── fetch-api-helpers.ts
├── cookie-client.ts
└── classname.ts
```

#### 4. Hook Files

Prefix custom hooks with `use-`:

```plaintext
hooks/
├── use-mobile.ts
├── use-toast.ts
├── use-pagination.ts
└── use-navigation.ts
```

### Directory Organization

#### 1. Feature-Based Structure

Organize features in dedicated directories:

```plaintext
features/
├── login/
│   ├── index.tsx              # Page component
│   ├── login-form.tsx         # Form component
│   └── use-login.ts           # Custom hook
└── portal/
    ├── index.tsx
    ├── portal-table.tsx
    └── portal-filters.tsx
```

#### 2. Component Organization

Group related components:

```plaintext
components/
├── ui/                        # Shadcn/ui components
│   ├── button.tsx
│   ├── dialog.tsx
│   └── popover.tsx
├── app-sidebar.tsx            # Main sidebar
├── app-sidebar-header.tsx     # Sidebar header
├── app-sidebar-menu.tsx       # Sidebar menu
├── app-sidebar-footer.tsx     # Sidebar footer
└── notifications.tsx          # Notifications
```

#### 3. Utility Organization

Group utilities by purpose:

```plaintext
utils/
├── api.ts                     # API utilities
├── fetch-api.ts               # Fetch wrapper
├── fetch-api-helpers.ts       # Fetch helpers
├── date.ts                    # Date utilities
├── string.ts                  # String utilities
├── number.ts                  # Number utilities
└── classname.ts               # Class name utilities
```

---

## State Management

### Client State (React Hooks)

Use React hooks for local component state:

```tsx
"use client";

import { useState } from "react";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* Popover content */}
    </Popover>
  );
}
```

### Server State (TanStack Query)

Use TanStack Query for server data:

```tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications: data ?? [],
    isLoading,
    error,
    markAsRead: markAsReadMutation.mutate,
  };
}
```

### Context for Shared State

Use React Context for shared UI state:

```tsx
"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
```

---

## Data Fetching & Server Actions

### Server Actions Pattern

Create server actions in `app/actions/`:

```tsx
// app/actions/notifications.ts
"use server";

import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(id: string) {
  try {
    await fetch(`/api/notifications/${id}/read`, {
      method: "POST",
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to mark as read" };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    await fetch("/api/notifications/read-all", {
      method: "POST",
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to mark all as read" };
  }
}
```

### Using Server Actions

#### With useActionState

```tsx
"use client";

import { useActionState } from "react";
import { markNotificationAsRead } from "@/app/actions/notifications";

export function NotificationItem({ notification }: { notification: Notification }) {
  const [state, formAction, isPending] = useActionState(markNotificationAsRead, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={notification.id} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Marking..." : "Mark as Read"}
      </button>
    </form>
  );
}
```

#### With useTransition

```tsx
"use client";

import { useTransition } from "react";
import { markNotificationAsRead } from "@/app/actions/notifications";

export function NotificationItem({ notification }: { notification: Notification }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    startTransition(async () => {
      await markNotificationAsRead(notification.id);
    });
  };

  return (
    <button onClick={handleMarkAsRead} disabled={isPending}>
      {isPending ? "Marking..." : "Mark as Read"}
    </button>
  );
}
```

---

## Form Handling

### React Hook Form + Zod

Use React Hook Form with Zod for form validation:

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
}
```

### Form with Server Actions

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Log In"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Input name="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <Input name="password" type="password" placeholder="Password" required />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
```

---

## Internationalization (i18n)

### Translation Files

Store translations in `messages/` directory:

```json
// messages/en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  },
  "notifications": {
    "title": "Notifications",
    "markAllAsRead": "Mark all as read",
    "noNotifications": "No notifications yet"
  }
}
```

```json
// messages/th.json
{
  "common": {
    "save": "บันทึก",
    "cancel": "ยกเลิก",
    "delete": "ลบ",
    "edit": "แก้ไข"
  },
  "notifications": {
    "title": "การแจ้งเตือน",
    "markAllAsRead": "ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว",
    "noNotifications": "ยังไม่มีการแจ้งเตือน"
  }
}
```

### Using Translations

```tsx
import { useTranslations } from "next-intl";

export function Notifications() {
  const t = useTranslations("notifications");

  return (
    <div>
      <h2>{t("title")}</h2>
      <button>{t("markAllAsRead")}</button>
      <p>{t("noNotifications")}</p>
    </div>
  );
}
```

---

## Performance Optimization

### 1. Code Splitting

Use dynamic imports for large components:

```tsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Disable SSR if not needed
});

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  );
}
```

### 2. Image Optimization

Use Next.js Image component:

```tsx
import Image from "next/image";

<Image
  src="/placeholder-user.jpg"
  alt="User avatar"
  width={40}
  height={40}
  className="rounded-full"
  priority // For above-the-fold images
/>;
```

### 3. Memoization

Use React.memo for expensive components:

```tsx
import { memo } from "react";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = memo(function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  return <div onClick={() => onMarkAsRead(notification.id)}>{notification.title}</div>;
});
```

### 4. Lazy Loading

Lazy load components that are not immediately visible:

```tsx
"use client";

import { Suspense, lazy } from "react";

const NotificationList = lazy(() => import("./notification-list"));

export function Notifications() {
  return (
    <Suspense fallback={<div>Loading notifications...</div>}>
      <NotificationList />
    </Suspense>
  );
}
```

---

## Accessibility Standards

### 1. Semantic HTML

Use semantic HTML elements:

```tsx
// ✅ GOOD - Semantic HTML
<nav>
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/settings">Settings</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>

// ❌ BAD - Non-semantic
<div className="nav">
  <div className="nav-item">Dashboard</div>
  <div className="nav-item">Settings</div>
</div>
```

### 2. ARIA Labels

Provide ARIA labels for interactive elements:

```tsx
<Button variant="ghost" size="icon" aria-label="Open notifications">
  <Bell className="h-5 w-5" />
</Button>

<Button variant="ghost" size="icon" aria-label="Toggle theme">
  <Sun className="h-5 w-5" />
  <span className="sr-only">Toggle theme</span>
</Button>
```

### 3. Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Click me
</button>
```

### 4. Focus Management

Manage focus for modals and dialogs:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function Dialog({ isOpen }: { isOpen: boolean }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true">
      {/* Dialog content */}
    </div>
  );
}
```

---

## Testing Standards

### Unit Testing with Vitest

```tsx
// components/__tests__/button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../ui/button";

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

### Component Testing

```tsx
// components/__tests__/notifications.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Notifications } from "../notifications";

describe("Notifications", () => {
  it("shows notification count badge", () => {
    render(<Notifications />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("opens popover when bell icon is clicked", () => {
    render(<Notifications />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("marks notification as read when clicked", () => {
    render(<Notifications />);

    fireEvent.click(screen.getByRole("button"));
    const notification = screen.getByText("Sample Analysis Completed");
    fireEvent.click(notification);

    // Verify notification is marked as read
    expect(notification).not.toHaveClass("font-semibold");
  });
});
```

---

## Code Quality & Linting

### ESLint Configuration

The project uses strict ESLint rules with **max 0 warnings**:

```bash
# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### TypeScript Type Checking

Always run type checking before committing:

```bash
# Type check without emitting files
pnpm check-types
```

### Pre-commit Hooks

The project uses Husky and lint-staged for pre-commit checks:

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

Use Prettier for consistent formatting:

```bash
# Format all files
pnpm format
```

---

## Quick Reference

### Common Patterns Cheat Sheet

#### Import Aliases

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/user";
```

#### Component Template

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  className?: string;
}

export function MyComponent({ title, onAction, className }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cn("base-classes", isActive && "active-classes", className)}>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

#### Server Action Template

```tsx
// app/actions/my-action.ts
"use server";

import { revalidatePath } from "next/cache";

export async function myAction(formData: FormData) {
  try {
    const data = {
      field: formData.get("field") as string,
    };

    // Perform action
    await performAction(data);

    revalidatePath("/path");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Action failed" };
  }
}
```

#### Custom Hook Template

```tsx
// hooks/use-my-hook.ts
"use client";

import { useState, useEffect } from "react";

export function useMyHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [value]);

  return {
    value,
    setValue,
  };
}
```

### Common Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build               # Build for production
pnpm start               # Start production server

# Code Quality
pnpm lint                # Run ESLint
pnpm check-types         # Run TypeScript type checking
pnpm format              # Format with Prettier

# Testing
pnpm test                # Run tests
pnpm test:watch          # Run tests in watch mode
```

### File Structure Quick Reference

```plaintext
apps/central-lab-portal/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth pages
│   ├── (main)/         # Main app pages
│   ├── actions/        # Server actions
│   └── globals.css     # Global styles
├── components/         # Shared components
│   └── ui/             # Shadcn/ui components
├── features/           # Feature modules
├── hooks/              # Custom hooks
├── lib/                # Library configs
├── types/              # TypeScript types
├── utils/              # Utility functions
└── messages/           # i18n translations
```

---

## Migration Notes from Previous Standards

### Key Changes from v2.0

1. **UI Library**: Migrated from Material-UI v7 to Shadcn/ui + Base UI
2. **Component Pattern**: Changed from `asChild` (Radix) to `render` prop (Base UI)
3. **Styling**: Fully adopted Tailwind CSS v4 with `@theme` and `@custom-variant`
4. **File Naming**: Standardized on kebab-case for all files
5. **Component Organization**: Simplified structure with clear separation

### Breaking Changes

- **No more Material-UI components**: Use Shadcn/ui components instead
- **No `asChild` prop**: Use `render` prop for component composition
- **Different theming approach**: Use CSS variables with Tailwind v4
- **Icon library**: Changed from Material Icons to Lucide React

### Upgrade Path

1. Replace Material-UI imports with Shadcn/ui equivalents
2. Update component composition from `asChild` to `render` prop
3. Migrate custom styles to Tailwind utility classes
4. Update icon imports from Material Icons to Lucide React
5. Adopt new file naming conventions (kebab-case)

---

## Conclusion

This document provides comprehensive standards for developing the Central Lab Portal application. Following these guidelines ensures:

- **Consistency**: Uniform code style across the codebase
- **Maintainability**: Easy to understand and modify code
- **Performance**: Optimized components and efficient rendering
- **Accessibility**: Inclusive user experience for all users
- **Type Safety**: Reduced runtime errors with TypeScript
- **Quality**: High-quality, tested, and linted code

For questions or clarifications, refer to the existing codebase examples or consult the team.

**Last Updated**: 2026-01-15
**Version**: 3.0
**Maintained by**: Central Lab Portal Development Team
