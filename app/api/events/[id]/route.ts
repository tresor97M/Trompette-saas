import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { EventType } from '.prisma/client';

// GET /api/events/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const event = await db.event.findUnique({
      where: { id },
      include: {
        attendances: {
          include: {
            member: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/events/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, type, startTime, endTime, location } = body;

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (location !== undefined) data.location = location || null;
    
    if (type !== undefined) {
      const typeUpper = type.toUpperCase();
      if (Object.values(EventType).includes(typeUpper as any)) {
        data.type = typeUpper as EventType;
      }
    }
    
    if (startTime !== undefined) data.startTime = new Date(startTime);
    if (endTime !== undefined) data.endTime = new Date(endTime);

    const updatedEvent = await db.event.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First delete associated attendances to prevent foreign key constraint violations
    await db.attendance.deleteMany({
      where: { eventId: id },
    });

    await db.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
