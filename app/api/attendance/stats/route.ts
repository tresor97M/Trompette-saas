import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AttendanceStatus } from '.prisma/client';

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

export async function GET(request: Request) {
  try {
    const church = await getOrCreateTestChurch();

    // Fetch all events for this church
    const events = await db.event.findMany({
      where: { churchId: church.id },
      orderBy: { startTime: 'desc' },
      include: {
        attendances: true,
      },
    });

    if (events.length === 0) {
      return NextResponse.json({
        activeEvent: null,
        stats: {
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          total: 0,
        },
        recentCheckIns: [],
      });
    }

    // Determine the active or most recent event that has attendances
    let activeEvent = events.find((e) => {
      const now = new Date();
      const eventDate = new Date(e.startTime);
      return eventDate.toDateString() === now.toDateString();
    });

    if (!activeEvent) {
      // fallback to the most recent event
      activeEvent = events[0];
    }

    // Get active event attendances
    const activeAttendances = await db.attendance.findMany({
      where: { eventId: activeEvent.id },
      include: {
        member: true,
      },
    });

    // Compute counts
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let excusedCount = 0;

    activeAttendances.forEach((a) => {
      if (a.status === AttendanceStatus.PRESENT) presentCount++;
      else if (a.status === AttendanceStatus.ABSENT) absentCount++;
      else if (a.status === AttendanceStatus.LATE) lateCount++;
      else if (a.status === AttendanceStatus.EXCUSED) excusedCount++;
    });

    const totalMarked = activeAttendances.length;

    // Fetch recent check-ins across all events for the feed
    const recentCheckIns = await db.attendance.findMany({
      where: {
        event: {
          churchId: church.id,
        },
        status: {
          in: [AttendanceStatus.PRESENT, AttendanceStatus.LATE, AttendanceStatus.EXCUSED],
        },
      },
      orderBy: {
        checkedInAt: 'desc',
      },
      take: 10,
      include: {
        member: true,
        event: true,
      },
    });

    const formattedRecent = recentCheckIns.map((r) => {
      const checkInTime = r.checkedInAt ? new Date(r.checkedInAt) : null;
      return {
        id: r.id,
        member: `${r.member.firstName} ${r.member.lastName}`,
        event: r.event.title,
        date: new Date(r.event.startTime).toISOString().split('T')[0],
        status: r.status.toLowerCase(),
        time: checkInTime ? checkInTime.toTimeString().split(' ')[0].substring(0, 5) : '-',
      };
    });

    return NextResponse.json({
      activeEvent: {
        id: activeEvent.id,
        title: activeEvent.title,
        type: activeEvent.type,
        startTime: activeEvent.startTime,
        endTime: activeEvent.endTime,
        location: activeEvent.location,
      },
      stats: {
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        excused: excusedCount,
        total: totalMarked,
      },
      recentCheckIns: formattedRecent,
    });
  } catch (error: any) {
    console.error('Error fetching attendance stats:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
