import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { EventType } from '.prisma/client';

async function getOrCreateTestChurch() {
  return await db.church.upsert({
    where: { slug: 'trompette-test' },
    update: {},
    create: {
      name: 'Trompette Test Church',
      slug: 'trompette-test',
      country: 'Cameroun',
      city: 'Yaoundé',
      primaryColor: '#C9A84C',
    },
  });
}

// GET /api/events
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    
    const church = await getOrCreateTestChurch();
    
    const whereClause: any = {
      churchId: church.id,
    };
    
    if (type !== 'all') {
      const typeUpper = type.toUpperCase();
      if (Object.values(EventType).includes(typeUpper as any)) {
        whereClause.type = typeUpper as EventType;
      }
    }
    
    const events = await db.event.findMany({
      where: whereClause,
      include: {
        attendances: true,
      },
      orderBy: {
        startTime: 'desc',
      },
    });
    
    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/events
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, type, startTime, endTime, location } = body;
    
    if (!title || !type || !startTime || !endTime) {
      return NextResponse.json({ error: 'Title, type, startTime, and endTime are required' }, { status: 400 });
    }
    
    const church = await getOrCreateTestChurch();
    
    let mappedType: EventType = EventType.REHEARSAL;
    const typeUpper = type.toUpperCase();
    if (Object.values(EventType).includes(typeUpper as any)) {
      mappedType = typeUpper as EventType;
    }
    
    const newEvent = await db.event.create({
      data: {
        title,
        type: mappedType,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location: location || null,
        churchId: church.id,
      },
    });
    
    return NextResponse.json(newEvent);
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
