import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ChoirSection, MemberStatus, Member } from '@prisma/client';

// Helper to find or create the default test church
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

// GET /api/members
// Fetches list of members with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const voice = searchParams.get('voice') || 'all';
    const status = searchParams.get('status') || 'all';

    const church = await getOrCreateTestChurch();

    // Build Prisma query filters
    const whereClause: any = {
      churchId: church.id,
    };

    // 1. Search filter
    if (search) {
      whereClause.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 2. Voice section filter
    if (voice !== 'all') {
      const formattedVoice = voice.toUpperCase();
      if (Object.values(ChoirSection).includes(formattedVoice as any)) {
        whereClause.choirSection = formattedVoice as ChoirSection;
      }
    }

    // 3. Status filter
    if (status !== 'all') {
      const formattedStatus = status.toUpperCase();
      if (Object.values(MemberStatus).includes(formattedStatus as any)) {
        whereClause.membershipStatus = formattedStatus as MemberStatus;
      }
    }

    // Fetch members sorted by creation date (newest first)
    const members = await db.member.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map Prisma models to match the page frontend data structure
    const formattedMembers = members.map((m: Member) => ({
      id: m.id,
      name: `${m.firstName} ${m.lastName}`,
      email: m.email || '',
      phone: m.phone || '',
      voiceType: m.choirSection.toLowerCase(),
      status: m.membershipStatus.toLowerCase(),
      dateJoined: m.dateJoined.toISOString().split('T')[0],
      avatar: m.avatarUrl || '',
    }));

    return NextResponse.json(formattedMembers);
  } catch (error: any) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/members
// Creates a new member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      whatsappNumber,
      choirSection,
      membershipStatus,
      country,
      avatarUrl,
    } = body;

    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First name and last name are required' }, { status: 400 });
    }

    const church = await getOrCreateTestChurch();

    // Map string values to Prisma enums
    let mappedSection: ChoirSection = ChoirSection.UNASSIGNED;
    if (choirSection) {
      const sectionUpper = choirSection.toUpperCase();
      if (Object.values(ChoirSection).includes(sectionUpper as any)) {
        mappedSection = sectionUpper as ChoirSection;
      }
    }

    let mappedStatus: MemberStatus = MemberStatus.ACTIVE;
    if (membershipStatus) {
      const statusUpper = membershipStatus.toUpperCase();
      if (Object.values(MemberStatus).includes(statusUpper as any)) {
        mappedStatus = statusUpper as MemberStatus;
      }
    }

    const newMember = await db.member.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        phone: phone || null,
        whatsappNumber: whatsappNumber || null,
        choirSection: mappedSection,
        membershipStatus: mappedStatus,
        country: country || 'Cameroun',
        avatarUrl: avatarUrl || null,
        churchId: church.id,
      },
    });

    const formattedMember = {
      id: newMember.id,
      name: `${newMember.firstName} ${newMember.lastName}`,
      email: newMember.email || '',
      phone: newMember.phone || '',
      voiceType: newMember.choirSection.toLowerCase(),
      status: newMember.membershipStatus.toLowerCase(),
      dateJoined: newMember.dateJoined.toISOString().split('T')[0],
      avatar: newMember.avatarUrl || '',
    };

    return NextResponse.json(formattedMember);
  } catch (error: any) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
