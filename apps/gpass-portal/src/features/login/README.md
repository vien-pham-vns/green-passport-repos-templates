# Login Feature - Server Actions + API Route Architecture

## Architecture Overview

This login implementation follows Next.js 16 + React 19 best practices with a **Server Action → API Route → Backend** flow for secure authentication with cookie handling.

### Flow Diagram

```
┌─────────────┐      ┌────────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │─────▶│ Server Action  │─────▶│  API Route   │─────▶│   Backend   │
│  Component  │      │ (loginAction)  │      │ /api/auth/   │      │     API     │
│             │      │                │      │   login      │      │             │
└─────────────┘      └────────────────┘      └──────────────┘      └─────────────┘
      ▲                      │                        │                     │
      │                      │                        │                     │
      │                      │                        ▼                     │
      │                      │                  ┌──────────┐               │
      │                      │                  │  Set      │◀──────────────┘
      │                      │                  │  Cookies  │  (Set-Cookie)
      │                      │                  └──────────┘
      │                      │                        │
      │                      └────────────────────────┼──────────────────┐
      │                                               │                  │
      │                                               ▼                  ▼
      └───────────────────────────────────────── redirect('/portal')
```

## File Structure

```
src/features/login/
├── index.tsx           # Client Component with useActionState
├── actions.ts          # Server Action for form handling
└── README.md          # This file

src/app/api/auth/login/
└── route.ts           # API Route Handler for backend communication
```

## Implementation Details

### 1. Client Component (`index.tsx`)

Uses React 19's `useActionState` hook for progressive enhancement:

```tsx
const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(
  loginAction,
  null
);
```

**Key Features:**
- ✅ Works without JavaScript (Progressive Enhancement)
- ✅ Shows loading state with `isPending`
- ✅ Displays field-level validation errors
- ✅ Toast notifications for user feedback
- ✅ Native HTML form with `action` prop

### 2. Server Action (`actions.ts`)

Handles form validation and orchestrates the login flow:

```tsx
export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState>
```

**Responsibilities:**
- ✅ Extract and validate form data with Zod
- ✅ Call internal API route
- ✅ Return validation errors to client
- ✅ Redirect on successful login

**Why Server Action calls API Route?**
- Server Actions can't directly access response headers (Set-Cookie)
- API Routes can properly forward cookies from backend
- Separation of concerns: validation vs. authentication

### 3. API Route (`/api/auth/login/route.ts`)

Handles backend communication and cookie management:

```tsx
export async function POST(request: NextRequest)
```

**Responsibilities:**
- ✅ Forward credentials to backend API
- ✅ Parse `Set-Cookie` headers from backend response
- ✅ Set cookies using Next.js `cookies()` API
- ✅ Return sanitized response (no sensitive data)

**Cookie Handling:**
The API route parses cookies from backend in two ways:

1. **From `Set-Cookie` header** (Standard):
```typescript
const setCookieHeader = response.headers.get('set-cookie');
// Parse and set each cookie with proper attributes
```

2. **From response body** (Alternative):
```typescript
if (data.cookies) {
  Object.entries(data.cookies).forEach(([name, value]) => {
    cookieStore.set(name, value, { httpOnly: true, secure: true });
  });
}
```

## Environment Variables

Configure these in `.env.local`:

```bash
# Frontend URL (required for Server Action)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend API URL (required for API Route)
BACKEND_API_URL=https://api.your-backend.com
```

## Backend API Requirements

Your backend `/auth/login` endpoint should:

1. **Accept POST request** with JSON body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

2. **Return cookies** in one of these formats:

**Option A: Set-Cookie Header** (Recommended)
```
Set-Cookie: access_token=eyJhbGc...; HttpOnly; Secure; SameSite=Lax; Max-Age=3600; Path=/
Set-Cookie: refresh_token=dGVzdA...; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/
```

**Option B: Response Body**
```json
{
  "user": { "id": "123", "email": "user@example.com" },
  "cookies": {
    "access_token": "eyJhbGc...",
    "refresh_token": "dGVzdA..."
  }
}
```

3. **Error responses**:
```json
{
  "message": "Invalid credentials"
}
```

## Security Features

- ✅ **HttpOnly cookies**: Prevents XSS attacks
- ✅ **Secure flag**: HTTPS only in production
- ✅ **SameSite**: CSRF protection
- ✅ **Server-side validation**: Zod schema validation
- ✅ **No credential exposure**: Sensitive data never sent to client
- ✅ **Type-safe**: Full TypeScript coverage

## Testing

### Test with Mock Backend (Development)

For development, you can modify the API route to use a mock response:

```typescript
// In route.ts - temporarily replace backend call
if (process.env.NODE_ENV === 'development') {
  // Mock successful login
  if (email === 'test@example.com' && password === 'password') {
    const cookieStore = await cookies();
    cookieStore.set('access_token', 'mock_token', {
      httpOnly: true,
      secure: false,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: { id: '1', email },
    });
  }
}
```

### Test Validation Errors

Submit the form with:
- Invalid email: `not-an-email`
- Empty password: ` ` (spaces)

Expected: Field-level error messages appear below inputs.

### Test Backend Errors

When backend returns 401:
Expected: Toast notification with error message.

## Deployment Checklist

- [ ] Set `BACKEND_API_URL` in production environment
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Ensure backend allows CORS from your frontend domain
- [ ] Verify backend sets cookies with `Secure` flag
- [ ] Test login flow in production environment
- [ ] Verify cookies are properly set in browser DevTools

## Common Issues

### 1. "TypeError: fetch failed"
**Cause**: `BACKEND_API_URL` not set or incorrect
**Fix**: Check `.env.local` and restart dev server

### 2. Cookies not being set
**Cause**: SameSite/Secure mismatch or CORS issues
**Fix**:
- Development: Use `secure: false` and `sameSite: 'lax'`
- Production: Ensure HTTPS and `sameSite: 'none'` with CORS

### 3. "Invalid credentials" even with correct password
**Cause**: Request not reaching backend or wrong endpoint
**Fix**: Check network tab, verify `BACKEND_API_URL` is correct

## Future Enhancements

- [ ] Add remember me functionality
- [ ] Implement refresh token rotation
- [ ] Add rate limiting
- [ ] Add 2FA support
- [ ] Add OAuth providers (Google, GitHub)
- [ ] Add password strength meter

## References

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React 19 useActionState](https://react.dev/reference/react/useActionState)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)
