import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for messages (in production, use a database)
let messagesStore: any[] = [];

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }
  // In production, verify the actual JWT token
  return true;
}

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ messages: messagesStore });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      service,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    messagesStore.push(newMessage);

    // Send email notification (implement your email service here)
    // await sendEmailToAdmin(newMessage);

    return NextResponse.json({
      success: true,
      message: 'Message received successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
