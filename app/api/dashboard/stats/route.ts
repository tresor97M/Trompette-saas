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
    const now = new Date();

    // 1. Active Member Count
    const memberCount = await db.member.count({
      where: {
        churchId: church.id,
        membershipStatus: 'ACTIVE',
      },
    });

    // 2. Songs Count
    const songCount = await db.song.count({
      where: {
        churchId: church.id,
      },
    });

    // 3. Upcoming Events within next 7 days
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingEventsCount = await db.event.count({
      where: {
        churchId: church.id,
        startTime: {
          gte: now,
          lte: nextWeek,
        },
      },
    });

    // 4. Attendance rate over the last 30 days
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentAttendances = await db.attendance.findMany({
      where: {
        event: {
          churchId: church.id,
          startTime: {
            gte: thirtyDaysAgo,
            lte: now,
          },
        },
      },
    });

    let totalMarked = recentAttendances.length;
    let presentOrLate = recentAttendances.filter(
      (a) => a.status === AttendanceStatus.PRESENT || a.status === AttendanceStatus.LATE
    ).length;

    const attendanceRate = totalMarked > 0 ? Math.round((presentOrLate / totalMarked) * 100) : 85;

    // 5. Recent Songs
    const recentSongs = await db.song.findMany({
      where: { churchId: church.id },
      take: 4,
      orderBy: { createdAt: 'desc' },
    });

    const formattedSongs = recentSongs.map((s) => ({
      id: s.id,
      title: s.title,
      author: s.author,
      key: s.key || 'N/A',
    }));

    // 6. Upcoming Events
    const events = await db.event.findMany({
      where: {
        churchId: church.id,
        startTime: { gte: now },
      },
      take: 3,
      orderBy: { startTime: 'asc' },
    });

    const formattedEvents = events.map((e) => {
      const start = new Date(e.startTime);
      const end = new Date(e.endTime);
      return {
        id: e.id,
        title: e.title,
        titleFR: e.title,
        date: start.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        dateFR: start.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' }),
        time: `${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`,
        timeFR: `${start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
        location: e.location || 'N/A',
        type: e.type.toLowerCase(),
        attendees: memberCount || 10,
      };
    });

    // 7. Voice Section Distribution
    const sections = ['SOPRANO', 'ALTO', 'TENOR', 'BASS'];
    const sectionDistribution = await Promise.all(
      sections.map(async (sec) => {
        const count = await db.member.count({
          where: {
            churchId: church.id,
            choirSection: sec as any,
            membershipStatus: 'ACTIVE',
          },
        });
        return {
          name: sec.charAt(0) + sec.slice(1).toLowerCase(),
          value: count,
          color: sec === 'SOPRANO' ? '#D4AF37' : sec === 'ALTO' ? '#10B981' : sec === 'TENOR' ? '#A855F7' : '#0F172A',
        };
      })
    );

    const isProjectEmpty = memberCount === 0 && songCount === 0;

    return NextResponse.json({
      isMockData: isProjectEmpty,
      kpis: {
        membersCount: isProjectEmpty ? 67 : memberCount,
        songsCount: isProjectEmpty ? 156 : songCount,
        eventsCount: isProjectEmpty ? 8 : upcomingEventsCount,
        attendanceRate: isProjectEmpty ? 89 : attendanceRate,
      },
      recentSongs: isProjectEmpty ? undefined : formattedSongs,
      upcomingEvents: isProjectEmpty ? undefined : formattedEvents,
      voiceDistribution: isProjectEmpty ? undefined : sectionDistribution,
    });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({
      isMockData: true,
      kpis: {
        membersCount: 67,
        songsCount: 156,
        eventsCount: 8,
        attendanceRate: 89,
      },
    });
  }
}
