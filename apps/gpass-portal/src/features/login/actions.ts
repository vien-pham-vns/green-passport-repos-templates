'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { TOKEN_COOKIE_NAME } from '@/constant/common';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required'),
});

export type LoginState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  try {
    // Extract form data
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate with Zod
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { email: validEmail, password: validPassword } = validationResult.data;

    // Dummy login for testing
    const cookieStore = await cookies();
    if (validEmail === 'test@example.com' && validPassword === 'password') {
      cookieStore.set(TOKEN_COOKIE_NAME, 'dummy-token', {
        httpOnly: true,
        secure: process.env.DEPLOYMENT_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      redirect('/portal');
    }
    // END dummy

    // Call the API route
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: validEmail,
        password: validPassword,
      }),
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Login failed. Please check your credentials.',
      };
    }

    // If login successful, redirect will happen after this return
    // We use redirect() separately to handle the navigation
  } catch (error) {
    console.error('Login action error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }

  // Redirect on success (this will throw and prevent return)
  redirect('/portal');
}
