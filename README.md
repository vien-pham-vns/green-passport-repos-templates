# DT Frontend Microfrontends Monorepo

A Turborepo-powered microfrontends monorepo with Next.js and Vite applications sharing common UI packages.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Lint all applications
pnpm lint

# Type check all applications
pnpm check-types
```

## Architecture

This monorepo contains **3 microfrontend applications** that can be developed and deployed independently:

### Shared Packages

- `@dt/mui-ui` - Material-UI v7 components with Emotion
- `@dt/example-ui` - Example React components
- `@dt/eslint-config` - Shared ESLint configurations
- `@dt/typescript-config` - Shared TypeScript configurations

## Development

### Running Individual Apps

```bash
# Navigate to app directory
cd apps/gpass-portal
# or

# Start development server
pnpm dev
```

Ports are automatically assigned via Turborepo's microfrontend configuration.

### Working with Shared Packages

Packages use the workspace protocol and path-based exports:

```tsx
// Import from shared UI packages
import Button from "@dt/mui-ui/v7/button";
import { Card } from "@dt/example-ui/card";
```

### Adding New Components

```bash
cd packages/mui-ui
pnpm generate:component
```

Each app can:

- Run independently on its own port
- Be developed in isolation
- Share common UI components
- Be deployed separately

## Tech Stack

- **Package Manager**: pnpm (v10.16.1)
- **Build System**: Turborepo 2.6.1
- **Frontend Framework**: React 19
- **Next.js**: v16.1.1 (App Router with RSC)
- **UI Library**: Material-UI v7
- **TypeScript**: v5.9.2
- **Node**: >=18

## Project Structure

```
dt-fe-monorepo/
├── apps/
│   ├── gpass-portal
├── packages/
│   ├── mui-ui/       # Material-UI components
│   ├── example-ui/   # Example components
│   ├── eslint-config/
│   └── typescript-config/
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml
```

## Key Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Start all apps in development  |
| `pnpm build`       | Build all apps and packages    |
| `pnpm lint`        | Lint all code (max 0 warnings) |
| `pnpm check-types` | TypeScript type checking       |
| `pnpm format`      | Format with Prettier           |

## Development Guidelines

### Next.js Apps

- Use **React Server Components** by default
- Add `"use client"` only when needed (interactivity, hooks)
- Leverage React 19 features: Server Actions, `useActionState`, `useOptimistic`
- Use React's `cache()` for request memoization
- Implement type-safe query params with `nuqs`

### Shared Components

- Export components using path-based exports
- Keep components framework-agnostic when possible
- Use composition patterns for flexibility

## Turborepo Features

- **Parallel Execution**: Runs tasks across packages in parallel
- **Smart Caching**: Caches build outputs for faster rebuilds
- **Dependency Graph**: Automatically handles build dependencies
- **Microfrontend Support**: Built-in port management and routing

## Deployment

Each application can be deployed independently:

```bash
# Build specific app
cd apps/gpass-portal && pnpm build

# Or build all
pnpm build
```

Next.js apps output to `.next/` directory, Vite apps output to `dist/`.

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/)
- [CLAUDE.md](./CLAUDE.md) - Detailed implementation patterns for AI assistants
