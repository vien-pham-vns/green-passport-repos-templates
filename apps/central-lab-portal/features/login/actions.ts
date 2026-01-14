"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

import { TOKEN_COOKIE_NAME } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().min(1, "Password is required"),
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
  formData: FormData,
): Promise<LoginState> {
  try {
    // Extract form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackUrl = formData.get("callbackUrl") as string | null;

    // Validate with Zod
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { email: validEmail, password: validPassword } =
      validationResult.data;

    // Dummy login for testing
    const cookieStore = await cookies();
    if (validEmail === "test@example.com" && validPassword === "password") {
      cookieStore.set(TOKEN_COOKIE_NAME, "dummy-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/", // Must match basePath for cookie to be sent
      });

      // Debug: Log callback URL
      console.log("Login callbackUrl:", callbackUrl);

      // Redirect to callbackUrl if provided, otherwise go to home
      const redirectUrl = callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";
      console.log("Login redirectUrl:", redirectUrl);

      redirect(redirectUrl as any);
    }
    // END dummy

    // TODO: Replace with real API call
    // const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    // const response = await fetch(`${baseUrl}/api/auth/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: validEmail,
    //     password: validPassword,
    //   }),
    //   credentials: 'include',
    // });

    // const data = await response.json();

    // if (!response.ok) {
    //   return {
    //     success: false,
    //     error: data.error || 'Login failed. Please check your credentials.',
    //   };
    // }

    return {
      success: false,
      error: "Invalid credentials. Use test@example.com / password",
    };
  } catch (error) {
    // Re-throw redirect errors - they're intentional, not actual errors
    if (error && typeof error === 'object' && 'digest' in error &&
        typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error("Login action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
