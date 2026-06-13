import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        member: true,
      },
    });

    if (!user || !user.passwordHash || !comparePassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Map Prisma role to frontend role
    // Front roles: 'admin' | 'director' | 'section_leader' | 'member' | 'guest'
    let mappedRole = 'member';
    if (user.role === 'CHURCH_ADMIN' || user.role === 'SUPER_ADMIN') {
      mappedRole = 'admin';
    } else if (user.role === 'MUSIC_DIRECTOR' || user.role === 'CHOIR_MASTER') {
      mappedRole = 'director';
    } else if (user.role === 'SECTION_LEADER') {
      mappedRole = 'section_leader';
    }

    const memberInfo = user.member || {
      firstName: 'Admin',
      lastName: 'User',
      avatarUrl: undefined,
      dateJoined: new Date(),
    };

    // Format response to match the frontend User type
    const formattedUser = {
      id: user.id,
      email: user.email,
      firstName: memberInfo.firstName,
      lastName: memberInfo.lastName,
      avatar: memberInfo.avatarUrl || undefined,
      role: mappedRole,
      status: 'active',
      dateJoined: memberInfo.dateJoined.toISOString(),
      lastActive: new Date().toISOString(),
      churchId: user.churchId,
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
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
