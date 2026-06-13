import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { UserRole } from '.prisma/client';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const church = await getOrCreateTestChurch();
    const passwordHash = hashPassword(password);

    // Create user and associated member in a transaction
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role: UserRole.CHOIR_MEMBER,
          churchId: church.id,
        },
      });

      const member = await tx.member.create({
        data: {
          firstName,
          lastName,
          email,
          country: church.country,
          city: church.city,
          choirSection: 'UNASSIGNED',
          membershipStatus: 'ACTIVE',
          userId: user.id,
          churchId: church.id,
        },
      });

      return { user, member };
    });

    // Format response to match the frontend User type
    const formattedUser = {
      id: result.user.id,
      email: result.user.email,
      firstName: result.member.firstName,
      lastName: result.member.lastName,
      avatar: result.member.avatarUrl || undefined,
      role: 'member', // Map CHOIR_MEMBER to frontend 'member'
      status: 'active',
      dateJoined: result.member.dateJoined.toISOString(),
      lastActive: new Date().toISOString(),
      churchId: church.id,
      ministryIds: [],
      notificationPreferences: {
        email: true,
        push: true,
        sms: false,
        rehearsalReminders: true,
        serviceReminders: true,
        prayerRequestUpdates: true,
        announcements: true,
      },
      createdAt: result.user.createdAt.toISOString(),
      updatedAt: result.user.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
