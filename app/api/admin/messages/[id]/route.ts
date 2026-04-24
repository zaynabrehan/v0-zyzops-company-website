import { NextRequest, NextResponse } from 'next/server';

// Reference to the same storage (in production, use a database)
// This is a simplified solution - use a real database in production
let messagesStore: any[] = [];

// GET the storage reference from the parent route
async function getMessagesStore() {
  // In production, fetch from database
  return messagesStore;
}

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') || false;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    // Find and remove message
    const index = messagesStore.findIndex((msg) => msg.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: 'Message not found' },
        { status: 404 }
      );
    }

    messagesStore.splice(index, 1);

    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
