import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AttendanceStatus, CheckInMethod } from '.prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: eventId } = params;
    const body = await request.json();
    const { memberId, qrToken } = body;

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    let finalMemberId = memberId;

    // If check-in is initiated via scanning the event's QR Code token:
    if (qrToken) {
      if (event.qrToken !== qrToken) {
        return NextResponse.json({ error: 'Invalid QR Code token' }, { status: 400 });
      }
      if (event.qrExpiresAt && new Date() > event.qrExpiresAt) {
        return NextResponse.json({ error: 'QR Code has expired' }, { status: 400 });
      }
    }

    if (!finalMemberId) {
      return NextResponse.json({ error: 'Member identification is required' }, { status: 400 });
    }

    const member = await db.member.findUnique({
      where: { id: finalMemberId },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Check if they are late (threshold: 15 minutes after start time)
    const now = new Date();
    const diffMs = now.getTime() - event.startTime.getTime();
    const diffMins = diffMs / (1000 * 60);

    const status = diffMins > 15 ? AttendanceStatus.LATE : AttendanceStatus.PRESENT;
    const method = qrToken ? CheckInMethod.QR_CODE : CheckInMethod.MANUAL;

    const attendance = await db.attendance.upsert({
      where: {
        eventId_memberId: {
          eventId,
          memberId: finalMemberId,
        },
      },
      update: {
        status,
        checkedInAt: now,
        method,
      },
      create: {
        eventId,
        memberId: finalMemberId,
        status,
        checkedInAt: now,
        method,
      },
    });

    return NextResponse.json({
      success: true,
      attendance,
      member: {
        firstName: member.firstName,
        lastName: member.lastName,
        choirSection: member.choirSection,
      },
    });
  } catch (error: any) {
    console.error('Error during check-in:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
