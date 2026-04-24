import { NextRequest, NextResponse } from 'next/server';

// In-memory storage - in production use a database
let messagesStore: any[] = [];

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') || false;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    // Find and update message read status
    const message = messagesStore.find((msg) => msg.id === id);
    if (!message) {
      return NextResponse.json(
        { message: 'Message not found' },
        { status: 404 }
      );
    }

    message.isRead = true;

    return NextResponse.json({
      success: true,
      message: 'Message marked as read',
      data: message,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
