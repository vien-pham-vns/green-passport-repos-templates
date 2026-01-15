# Docker Build Instructions for central-lab-portal

## Prerequisites

- Docker installed and running
- Run commands from the **monorepo root** (`/gpass-monorepo-templates/`)

## Building the Image

```bash
# From monorepo root
docker build -f apps/central-lab-portal/Dockerfile -t central-lab-portal:latest .
```

### Build Arguments (if needed)

```bash
docker build -f apps/central-lab-portal/Dockerfile \
  --build-arg NEXT_PUBLIC_XXX=your_value \
  --build-arg XXX=your_value \
  -t central-lab-portal:latest .
```

## Running the Container

### Basic run

```bash
docker run -p 3000:3000 central-lab-portal:latest
```

### With environment variables

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  central-lab-portal:latest
```

### With custom port

```bash
docker run -p 8080:3000 \
  -e PORT=3000 \
  central-lab-portal:latest
```

## Docker Compose Example

```yaml
version: "3.8"
services:
  central-lab-portal:
    build:
      context: .
      dockerfile: apps/central-lab-portal/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    restart: unless-stopped
```

## Key Configuration Details

- **Base Image**: Node.js 20.18 Alpine
- **Package Manager**: pnpm 10.16.1
- **Output Format**: Next.js standalone
- **Port**: 3000 (configurable via PORT env var)
- **User**: nextjs (non-root, UID 1001)
- **Final Image Size**: ~307MB

## Troubleshooting

### Build context errors

Make sure you're running the build from the monorepo root:

```bash
cd /path/to/gpass-monorepo-templates
docker build -f apps/central-lab-portal/Dockerfile -t central-lab-portal:latest .
```

### Environment variables

The Dockerfile includes placeholder environment variables that should be overridden:

- `NEXT_PUBLIC_XXX` - Replace with actual public env vars
- `XXX` - Replace with actual server-side env vars

Update the Dockerfile or pass them at runtime using `-e` flags.

## Monorepo Structure

The Dockerfile handles the monorepo structure by:

1. Copying monorepo config files (pnpm-workspace.yaml, pnpm-lock.yaml)
2. Installing all workspace dependencies
3. Building only the central-lab-portal app
4. Using Next.js standalone output for minimal runtime image
