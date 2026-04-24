import { NextRequest, NextResponse } from 'next/server';

// Default admin credentials (in production, use proper authentication)
const ADMIN_EMAIL = 'admin@zyzops.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // In production, create a proper JWT token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
      });
    }

    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
