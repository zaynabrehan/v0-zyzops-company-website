import { NextRequest, NextResponse } from 'next/server';

const DEMO_USERS = [
  { email: 'user@example.com', password: 'user123', name: 'Demo User' },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = DEMO_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        success: true,
        token,
        email: user.email,
        name: user.name,
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
