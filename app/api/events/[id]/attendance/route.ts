import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AttendanceStatus, CheckInMethod } from '.prisma/client';

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

// GET /api/events/[id]/attendance
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: eventId } = params;

    // Verify event exists
    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const church = await getOrCreateTestChurch();

    // Fetch all members of the church
    const members = await db.member.findMany({
      where: {
        churchId: church.id,
        membershipStatus: 'ACTIVE',
      },
      orderBy: [
        { firstName: 'asc' },
        { lastName: 'asc' },
      ],
    });

    // Fetch all attendance records for this event
    const attendances = await db.attendance.findMany({
      where: { eventId },
    });

    // Map members to their attendance records
    const attendanceMap = new Map(attendances.map((a) => [a.memberId, a]));

    const result = members.map((m) => {
      const att = attendanceMap.get(m.id);
      return {
        id: att?.id || null,
        memberId: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        choirSection: m.choirSection,
        avatarUrl: m.avatarUrl,
        status: att?.status || null,
        checkedInAt: att?.checkedInAt || null,
        method: att?.method || null,
        note: att?.note || null,
      };
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching event attendance:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/events/[id]/attendance
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: eventId } = params;
    const body = await request.json();
    const { memberId, status, method, note } = body;

    if (!memberId || !status) {
      return NextResponse.json({ error: 'memberId and status are required' }, { status: 400 });
    }

    // Verify event exists
    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Verify member exists
    const member = await db.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    let mappedStatus: AttendanceStatus = AttendanceStatus.PRESENT;
    const statusUpper = status.toUpperCase();
    if (Object.values(AttendanceStatus).includes(statusUpper as any)) {
      mappedStatus = statusUpper as AttendanceStatus;
    }

    let mappedMethod: CheckInMethod = CheckInMethod.MANUAL;
    if (method) {
      const methodUpper = method.toUpperCase();
      if (Object.values(CheckInMethod).includes(methodUpper as any)) {
        mappedMethod = methodUpper as CheckInMethod;
      }
    }

    const now = new Date();
    const checkedInAt = (mappedStatus === AttendanceStatus.PRESENT || mappedStatus === AttendanceStatus.LATE)
      ? now
      : null;

    const attendance = await db.attendance.upsert({
      where: {
        eventId_memberId: {
          eventId,
          memberId,
        },
      },
      update: {
        status: mappedStatus,
        checkedInAt,
        method: mappedMethod,
        note: note !== undefined ? note : null,
      },
      create: {
        eventId,
        memberId,
        status: mappedStatus,
        checkedInAt,
        method: mappedMethod,
        note: note || null,
      },
    });

    return NextResponse.json(attendance);
  } catch (error: any) {
    console.error('Error posting attendance:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
