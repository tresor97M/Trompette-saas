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

  // 2. Clear existing members for this test church to ensure clean seed run
  await prisma.member.deleteMany({
    where: { churchId: church.id },
  });
  console.log('🧹 Cleaned existing members for test church.');

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
