import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SongLanguage, SongStyle, Song } from '.prisma/client';

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

// GET /api/songs
// Fetches list of songs with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const language = searchParams.get('language') || 'all';
    const style = searchParams.get('style') || 'all';
    const key = searchParams.get('key') || 'all';
    const theme = searchParams.get('theme') || 'all';

    const church = await getOrCreateTestChurch();

    const whereClause: any = {
      churchId: church.id,
    };

    // 1. Search filter
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleFR: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { composer: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 2. Language filter
    if (language !== 'all') {
      const langUpper = language.toUpperCase();
      if (Object.values(SongLanguage).includes(langUpper as any)) {
        whereClause.language = langUpper as SongLanguage;
      }
    }

    // 3. Style filter
    if (style !== 'all') {
      const styleUpper = style.toUpperCase();
      if (Object.values(SongStyle).includes(styleUpper as any)) {
        whereClause.style = styleUpper as SongStyle;
      }
    }

    // 4. Key (Tonalité) filter
    if (key !== 'all') {
      whereClause.key = key;
    }

    // 5. Theme filter
    if (theme !== 'all') {
      whereClause.themes = {
        has: theme,
      };
    }

    const songs = await db.song.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format songs to match the page frontend sitemap expectations
    const formattedSongs = songs.map((s: Song) => ({
      id: s.id,
      title: s.title,
      titleFR: s.titleFR || '',
      author: s.author,
      composer: s.composer || '',
      key: s.key || 'N/A',
      tempo: s.tempo || null,
      timeSignature: s.timeSignature || '4/4',
      language: s.language.toLowerCase(),
      style: s.style.toLowerCase(),
      themes: s.themes,
      bibleReferences: s.bibleReferences,
      audioUrl: s.audioUrl || '',
      pdfScoreUrl: s.pdfScoreUrl || '',
      isAiGenerated: s.isAiGenerated,
      usageCount: s.usageCount,
    }));

    return NextResponse.json(formattedSongs);
  } catch (error: any) {
    console.error('Error fetching songs:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/songs
// Creates a new song in the library
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      titleFR,
      author,
      composer,
      themes,
      bibleReferences,
      key,
      tempo,
      timeSignature,
      language,
      style,
      audioUrl,
      pdfScoreUrl,
    } = body;

    if (!title || !author) {
      return NextResponse.json({ error: 'Title and author are required' }, { status: 400 });
    }

    const church = await getOrCreateTestChurch();

    // Map string types to Prisma enums
    let mappedLang: SongLanguage = SongLanguage.EN;
    if (language) {
      const langUpper = language.toUpperCase();
      if (Object.values(SongLanguage).includes(langUpper as any)) {
        mappedLang = langUpper as SongLanguage;
      }
    }

    let mappedStyle: SongStyle = SongStyle.CONTEMPORARY;
    if (style) {
      const styleUpper = style.toUpperCase();
      if (Object.values(SongStyle).includes(styleUpper as any)) {
        mappedStyle = styleUpper as SongStyle;
      }
    }

    const newSong = await db.song.create({
      data: {
        title,
        titleFR: titleFR || null,
        author,
        composer: composer || null,
        themes: themes || [],
        bibleReferences: bibleReferences || [],
        key: key || null,
        tempo: tempo ? parseInt(tempo, 10) : null,
        timeSignature: timeSignature || '4/4',
        language: mappedLang,
        style: mappedStyle,
        audioUrl: audioUrl || null,
        pdfScoreUrl: pdfScoreUrl || null,
        churchId: church.id,
        createdBy: 'api',
      },
    });

    const formattedSong = {
      id: newSong.id,
      title: newSong.title,
      titleFR: newSong.titleFR || '',
      author: newSong.author,
      composer: newSong.composer || '',
      key: newSong.key || 'N/A',
      tempo: newSong.tempo,
      timeSignature: newSong.timeSignature || '4/4',
      language: newSong.language.toLowerCase(),
      style: newSong.style.toLowerCase(),
      themes: newSong.themes,
      bibleReferences: newSong.bibleReferences,
      audioUrl: newSong.audioUrl || '',
      pdfScoreUrl: newSong.pdfScoreUrl || '',
      isAiGenerated: newSong.isAiGenerated,
      usageCount: newSong.usageCount,
    };

    return NextResponse.json(formattedSong);
  } catch (error: any) {
    console.error('Error creating song:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
