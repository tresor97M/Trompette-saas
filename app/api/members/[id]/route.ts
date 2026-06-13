import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ChoirSection, MemberStatus } from '@prisma/client';

// GET /api/members/[id]
// Fetches detailed information of a member
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = await db.member.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    const formattedMember = {
      id: member.id,
      name: `${member.firstName} ${member.lastName}`,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email || '',
      phone: member.phone || '',
      whatsappNumber: member.whatsappNumber || '',
      voiceType: member.choirSection.toLowerCase(),
      status: member.membershipStatus.toLowerCase(),
      country: member.country,
      dateJoined: member.dateJoined.toISOString().split('T')[0],
      avatar: member.avatarUrl || '',
    };

    return NextResponse.json(formattedMember);
  } catch (error: any) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/members/[id]
// Updates an existing member
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const existingMember = await db.member.findUnique({
      where: { id: params.id },
    });

    if (!existingMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Map section and status if provided
    let mappedSection: ChoirSection | undefined = undefined;
    if (choirSection) {
      const sectionUpper = choirSection.toUpperCase();
      if (Object.values(ChoirSection).includes(sectionUpper as any)) {
        mappedSection = sectionUpper as ChoirSection;
      }
    }

    let mappedStatus: MemberStatus | undefined = undefined;
    if (membershipStatus) {
      const statusUpper = membershipStatus.toUpperCase();
      if (Object.values(MemberStatus).includes(statusUpper as any)) {
        mappedStatus = statusUpper as MemberStatus;
      }
    }

    const updatedMember = await db.member.update({
      where: { id: params.id },
      data: {
        firstName: firstName !== undefined ? firstName : undefined,
        lastName: lastName !== undefined ? lastName : undefined,
        email: email !== undefined ? (email || null) : undefined,
        phone: phone !== undefined ? (phone || null) : undefined,
        whatsappNumber: whatsappNumber !== undefined ? (whatsappNumber || null) : undefined,
        choirSection: mappedSection,
        membershipStatus: mappedStatus,
        country: country !== undefined ? country : undefined,
        avatarUrl: avatarUrl !== undefined ? (avatarUrl || null) : undefined,
      },
    });

    const formattedMember = {
      id: updatedMember.id,
      name: `${updatedMember.firstName} ${updatedMember.lastName}`,
      email: updatedMember.email || '',
      phone: updatedMember.phone || '',
      voiceType: updatedMember.choirSection.toLowerCase(),
      status: updatedMember.membershipStatus.toLowerCase(),
      dateJoined: updatedMember.dateJoined.toISOString().split('T')[0],
      avatar: updatedMember.avatarUrl || '',
    };

    return NextResponse.json(formattedMember);
  } catch (error: any) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/members/[id]
// Deletes a member
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingMember = await db.member.findUnique({
      where: { id: params.id },
    });

    if (!existingMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    await db.member.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
