# gpass-portal

A Next.js 16 dashboard application for a Central Lab Test Portal in Thailand. This serves as a portal for managing and tracking lab tests and results.

This project is part of a Turborepo microfrontends monorepo. For detailed information on the overall architecture, development commands, and coding patterns, please refer to the `CLAUDE.md` file in the root of the monorepo.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager

### Development

From the root of the monorepo:

```bash
# Install all dependencies
pnpm install

# Start all applications in development mode
pnpm dev
```

Navigate to the application directory (`apps/gpass-portal`) for app-specific commands:

```bash
# Start the development server for this app
pnpm dev

# Build the application
pnpm build

# Lint the application
pnpm lint

# Type check the application
pnpm check-types
```

The application will be available at a port assigned by Turborepo, typically starting from `http://localhost:3000`.

## Architecture Overview

This application is built as a microfrontend within a Turborepo monorepo.

### Key Technologies

- **Package Manager**: pnpm with workspaces
- **Build System**: Turborepo
- **Framework**: Next.js 16 with React 19
- **UI Framework**: Material-UI (MUI) v7 with Emotion
- **State Management**:
  - **Server State**: TanStack React Query v5
  - **Client State**: Zustand v5
- **Forms**: React Hook Form v7 & Zod v3
- **Testing**: Vitest & React Testing Library
- **TypeScript**: 5.9.2
- **Authentication**: Cookie-based JWT

For a complete overview of the monorepo structure and shared packages, please see `CLAUDE.md`.

### Key Features

- **Test Request Management**: Create, view, and manage lab test requests.
- **Sample Tracking**: Track samples from collection to analysis.
- **Result Reporting**: View, manage, and export test results.
- **User Management**: Manage user accounts and permissions.
- **Dashboard & Analytics**: Visualize key metrics and trends.
- **Profile Management**: User profile viewing and editing.

## Next.js 19 & React Server Components (RSC)

This application leverages the latest features of Next.js 16 and React 19, with a strong focus on React Server Components (RSC).

Key patterns include:
- **Server-First Approach**: Components are Server Components by default.
- **Server Actions**: For mutations and form handling.
- **React 19 Hooks**: `useActionState`, `useFormStatus`, `useOptimistic`, and `use`.
- **Advanced Caching**: Utilizing `fetch` cache options and React's `cache()` for request memoization.
- **Type-Safe Query Params**: Using `nuqs` for robust query parameter management.

For detailed explanations and code examples of these patterns, please consult the **"Next.js Implementation Patterns"** section in `CLAUDE.md`.

## Docker Deployment

The application is configured for containerized deployment:
- **Output**: `standalone` mode for optimized Docker images.
- **Multi-stage builds**: Supported via Next.js standalone output.
- **Environment**: Configurable via environment variables.
