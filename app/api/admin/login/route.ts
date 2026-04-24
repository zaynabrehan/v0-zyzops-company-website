import { NextRequest, NextResponse } from 'next/server';

// Default admin credentials (in production, use proper authentication)
const ADMIN_USERS = [
  { email: 'admin@zyzops.com', password: 'admin123', name: 'Admin' },
  { email: 'zaynabrehann@gmail.com', password: 'admin123', name: 'Zaynab' },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    const user = ADMIN_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      // In production, create a proper JWT token
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
