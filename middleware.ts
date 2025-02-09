// middleware.ts
import { NextResponse } from 'next/server';

export async function middleware(request: any) {
  // Extract token from cookies
  const token = request.cookies.get('token')?.value;

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Call the token verification API
    const response = await fetch(`${request.nextUrl.origin}/api/auth/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (data.valid) {
      // Attach user data to the request object
      request.user = data.user;

      // Allow the request to proceed
      return NextResponse.next();
    } else {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Token verification failed:', error);

    // Redirect to login on error
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Protect specific routes
export const config = {
  matcher: ['/dashboard', '/profile'], // Add protected routes here
};