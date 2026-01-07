import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual backend API endpoint
    const backendUrl = process.env.BACKEND_API_URL || 'https://api.example.com';
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Authentication failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Get cookies from backend response
    // const setCookieHeader = response.headers.get('set-cookie');
    const cookieStore = await cookies();

    // if (setCookieHeader) {
    //   // Parse and set cookies from backend
    //   const cookiePairs = setCookieHeader.split(',').map((cookie) => cookie.trim());

    //   cookiePairs.forEach((cookieString) => {
    //     const [cookiePart, ...attributesParts] = cookieString.split(';');
    //     const [name, value] = cookiePart.split('=');

    //     if (name && value) {
    //       // Parse cookie attributes
    //       const attributes = attributesParts.reduce(
    //         (acc, attr) => {
    //           const [key, val] = attr.trim().split('=');
    //           if (key) {
    //             acc[key.toLowerCase()] = val || true;
    //           }
    //           return acc;
    //         },
    //         {} as Record<string, any>
    //       );

    //       // Set cookie with Next.js cookies API
    //       cookieStore.set(name.trim(), value.trim(), {
    //         httpOnly: attributes.httponly === true,
    //         secure: attributes.secure === true,
    //         sameSite: (attributes.samesite as 'strict' | 'lax' | 'none') || 'lax',
    //         maxAge: attributes['max-age'] ? parseInt(attributes['max-age']) : undefined,
    //         path: attributes.path || '/',
    //       });
    //     }
    //   });
    // }

    // Alternatively, if backend returns cookies in response body
    if (data.cookies) {
      Object.entries(data.cookies)?.forEach(([name, value]: [string, any]) => {
        cookieStore.set(name, value, {
          httpOnly: true,
          secure: process.env.DEPLOYMENT_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
      });
    }

    // Return user data without sensitive information
    return NextResponse.json(
      {
        success: true,
        user: data.user,
        message: 'Login successful',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
