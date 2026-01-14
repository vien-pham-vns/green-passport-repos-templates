'use client';

import { useActionState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useTranslations } from '@/providers/translation-provider/client';

import { type LoginState, loginAction } from './actions';

type LoginProps = {
  callbackUrl?: string;
};

const Login = ({ callbackUrl }: LoginProps) => {
  const t = useTranslations('login');

  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Central Lab Portal
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {/* Hidden field to preserve callbackUrl */}
            {callbackUrl && (
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            )}

            {/* Show error alert if there's a general error */}
            {state?.error && !state?.fieldErrors && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('username-placeholder')}
                disabled={isPending}
                defaultValue="test@example.com"
                required
                className={state?.fieldErrors?.email ? 'border-red-500' : ''}
              />
              {state?.fieldErrors?.email && (
                <p className="text-sm text-red-500">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t('password-placeholder')}
                disabled={isPending}
                defaultValue="password"
                required
                className={state?.fieldErrors?.password ? 'border-red-500' : ''}
              />
              {state?.fieldErrors?.password && (
                <p className="text-sm text-red-500">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : t('sign-in-button')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
