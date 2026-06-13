import { PrismaClient } from '.prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not set in environment.');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create default Church tenant
  const church = await prisma.church.upsert({
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
  console.log(`⛪ Church upserted: ${church.name} (ID: ${church.id})`);

  // 2. Clear existing attendance, events, and members for this test church
  await prisma.attendance.deleteMany({});
  await prisma.event.deleteMany({
    where: { churchId: church.id },
  });
  await prisma.member.deleteMany({
    where: { churchId: church.id },
  });
  console.log('🧹 Cleaned existing attendance, events, and members for test church.');

  // 3. Create active test members
  const testMembers = [
    {
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah@church.com',
      phone: '+237 670 123 456',
      whatsappNumber: '+237 670 123 456',
      choirSection: 'SOPRANO' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Cameroun',
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'John',
      lastName: 'Adewole',
      email: 'john@church.com',
      phone: '+234 802 345 6789',
      whatsappNumber: '+234 802 345 6789',
      choirSection: 'TENOR' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Nigeria',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'Grace',
      lastName: 'Mensah',
      email: 'grace@church.com',
      phone: '+233 241 234 567',
      whatsappNumber: null,
      choirSection: 'ALTO' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Ghana',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'David',
      lastName: 'Ochieng',
      email: 'david@church.com',
      phone: '+254 712 345 678',
      whatsappNumber: null,
      choirSection: 'BASS' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Kenya',
      avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'Amara',
      lastName: 'Okonkwo',
      email: 'amara@church.com',
      phone: '+234 803 456 7890',
      whatsappNumber: '+234 803 456 7890',
      choirSection: 'SOPRANO' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Nigeria',
      avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'Marc',
      lastName: 'Kouamé',
      email: 'marc@church.com',
      phone: '+225 070 123 456',
      whatsappNumber: '+225 070 123 456',
      choirSection: 'TENOR' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Côte d\'Ivoire',
      avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      firstName: 'Marie-Joëlle',
      lastName: 'Douala',
      email: 'mariejo@church.com',
      phone: '+237 690 987 654',
      whatsappNumber: null,
      choirSection: 'SOPRANO' as const,
      membershipStatus: 'ACTIVE' as const,
      country: 'Cameroun',
      avatarUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  for (const m of testMembers) {
    const member = await prisma.member.create({
      data: {
        ...m,
        churchId: church.id,
      },
    });
    console.log(`👤 Created member: ${member.firstName} ${member.lastName} (${member.choirSection})`);
  }

  // 4. Clear existing songs
  await prisma.song.deleteMany({
    where: { churchId: church.id },
  });
  console.log('🧹 Cleaned existing songs for test church.');

  // 5. Create test songs
  const testSongs = [
    {
      title: 'Agneau de Dieu',
      titleFR: 'Agneau de Dieu',
      author: 'Dena Mwana',
      composer: 'Dena Mwana',
      themes: ['Adoration', 'Jésus', 'Croix'],
      bibleReferences: ['Jean 1:29', 'Apocalypse 5:12'],
      key: 'G',
      tempo: 68,
      timeSignature: '4/4',
      language: 'FR' as const,
      style: 'HYMN' as const,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      pdfScoreUrl: 'https://pdfobject.com/pdf/sample.pdf',
      createdBy: 'seed',
    },
    {
      title: 'Way Maker',
      titleFR: 'Celui qui fraye un chemin',
      author: 'Sinach',
      composer: 'Sinach',
      themes: ['Louange', 'Foi', 'Miracle'],
      bibleReferences: ['Exode 15:2', 'Ésaïe 43:19'],
      key: 'A',
      tempo: 66,
      timeSignature: '4/4',
      language: 'EN' as const,
      style: 'CONTEMPORARY' as const,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      pdfScoreUrl: 'https://pdfobject.com/pdf/sample.pdf',
      createdBy: 'seed',
    },
    {
      title: 'Jésus soit loué',
      titleFR: 'Jésus soit loué',
      author: 'Excellence',
      composer: null,
      themes: ['Action de grâce', 'Célébration'],
      bibleReferences: ['Psaume 150:6'],
      key: 'F#',
      tempo: 120,
      timeSignature: '4/4',
      language: 'FR' as const,
      style: 'TRADITIONAL' as const,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      createdBy: 'seed',
    },
    {
      title: 'Total Praise',
      titleFR: 'Louange Totale',
      author: 'Richard Smallwood',
      composer: 'Richard Smallwood',
      themes: ['Adoration', 'Chorale', 'Paix'],
      bibleReferences: ['Psaume 121:1-2'],
      key: 'Db',
      tempo: 58,
      timeSignature: '3/4',
      language: 'EN' as const,
      style: 'GOSPEL' as const,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      pdfScoreUrl: 'https://pdfobject.com/pdf/sample.pdf',
      createdBy: 'seed',
    },
  ];

  for (const s of testSongs) {
    const song = await prisma.song.create({
      data: {
        ...s,
        churchId: church.id,
      },
    });
    console.log(`🎵 Created song: ${song.title} (${song.key})`);
  }

  // 6. Create test events
  const createdMembers = await prisma.member.findMany({
    where: { churchId: church.id },
  });

  const now = new Date();
  
  // Weekly Rehearsal today (starts 2 hours ago, ends in 1 hour)
  const rehearsalTodayStart = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const rehearsalTodayEnd = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  
  // Sunday Service tomorrow
  const serviceTomorrowStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  serviceTomorrowStart.setHours(9, 0, 0, 0);
  const serviceTomorrowEnd = new Date(serviceTomorrowStart.getTime() + 3 * 60 * 60 * 1000);

  // Past Vocal Training (3 days ago)
  const trainingPastStart = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  trainingPastStart.setHours(18, 30, 0, 0);
  const trainingPastEnd = new Date(trainingPastStart.getTime() + 2 * 60 * 60 * 1000);

  // Past Prayer Meeting (7 days ago)
  const prayerPastStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  prayerPastStart.setHours(19, 0, 0, 0);
  const prayerPastEnd = new Date(prayerPastStart.getTime() + 1.5 * 60 * 60 * 1000);

  const testEvents = [
    {
      title: 'Répétition Hebdomadaire',
      type: 'REHEARSAL' as const,
      startTime: rehearsalTodayStart,
      endTime: rehearsalTodayEnd,
      location: 'Salle des Fêtes / Hall Principal',
    },
    {
      title: 'Culte de Louange du Dimanche',
      type: 'SUNDAY_SERVICE' as const,
      startTime: serviceTomorrowStart,
      endTime: serviceTomorrowEnd,
      location: 'Auditorium Principal',
    },
    {
      title: 'Formation Vocale Avancée',
      type: 'TRAINING' as const,
      startTime: trainingPastStart,
      endTime: trainingPastEnd,
      location: 'Salle Annexe B',
    },
    {
      title: 'Soirée de Prière et Louange',
      type: 'PRAYER_MEETING' as const,
      startTime: prayerPastStart,
      endTime: prayerPastEnd,
      location: 'Chapelle Haute',
    },
  ];

  const createdEvents = [];
  for (const e of testEvents) {
    const event = await prisma.event.create({
      data: {
        ...e,
        churchId: church.id,
      },
    });
    createdEvents.push(event);
    console.log(`📅 Created event: ${event.title} (${event.type})`);
  }

  // 7. Seed attendance records for events
  // For rehearsal today:
  const rehearsal = createdEvents[0];
  const rehearsalAttendance = [
    { name: 'Sarah', status: 'PRESENT' as const, method: 'QR_CODE' as const, minutesOffset: -15 },
    { name: 'John', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: 2 },
    { name: 'Grace', status: 'LATE' as const, method: 'QR_CODE' as const, minutesOffset: 15 },
    { name: 'David', status: 'ABSENT' as const, method: 'MANUAL' as const },
    { name: 'Amara', status: 'EXCUSED' as const, method: 'MANUAL' as const, note: 'Voyage professionnel' },
    { name: 'Marc', status: 'PRESENT' as const, method: 'MOBILE' as const, minutesOffset: -10 },
    { name: 'Marie-Joëlle', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: 5 },
  ];

  // For past training:
  const training = createdEvents[2];
  const trainingAttendance = [
    { name: 'Sarah', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: -5 },
    { name: 'John', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: 0 },
    { name: 'Grace', status: 'PRESENT' as const, method: 'QR_CODE' as const, minutesOffset: -10 },
    { name: 'David', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: -2 },
    { name: 'Amara', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: 5 },
    { name: 'Marc', status: 'ABSENT' as const, method: 'MANUAL' as const },
    { name: 'Marie-Joëlle', status: 'LATE' as const, method: 'MANUAL' as const, minutesOffset: 25 },
  ];

  // For past prayer meeting:
  const prayer = createdEvents[3];
  const prayerAttendance = [
    { name: 'Sarah', status: 'PRESENT' as const, method: 'QR_CODE' as const, minutesOffset: -8 },
    { name: 'John', status: 'LATE' as const, method: 'MANUAL' as const, minutesOffset: 20 },
    { name: 'Grace', status: 'PRESENT' as const, method: 'QR_CODE' as const, minutesOffset: -5 },
    { name: 'David', status: 'ABSENT' as const, method: 'MANUAL' as const },
    { name: 'Amara', status: 'EXCUSED' as const, method: 'MANUAL' as const, note: 'Indisposée' },
    { name: 'Marc', status: 'PRESENT' as const, method: 'MANUAL' as const, minutesOffset: -12 },
    { name: 'Marie-Joëlle', status: 'PRESENT' as const, method: 'QR_CODE' as const, minutesOffset: -2 },
  ];

  async function seedEventAttendance(event: any, attendanceData: any[]) {
    for (const item of attendanceData) {
      const member = createdMembers.find(m => m.firstName === item.name);
      if (member) {
        let checkedInAt = null;
        if ((item.status === 'PRESENT' || item.status === 'LATE') && item.minutesOffset !== undefined) {
          checkedInAt = new Date(event.startTime.getTime() + item.minutesOffset * 60 * 1000);
        }
        await prisma.attendance.create({
          data: {
            eventId: event.id,
            memberId: member.id,
            status: item.status,
            checkedInAt,
            method: item.method,
            note: item.note || null,
          },
        });
      }
    }
  }

  await seedEventAttendance(rehearsal, rehearsalAttendance);
  await seedEventAttendance(training, trainingAttendance);
  await seedEventAttendance(prayer, prayerAttendance);
  console.log('📝 Seeding check-ins completed.');

  console.log('✅ Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
