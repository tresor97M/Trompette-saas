import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SongLanguage, SongStyle, Song } from '.prisma/client';

// GET /api/songs/[id]
// Fetches detailed information of a single song
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const song = await db.song.findUnique({
      where: { id: params.id },
    });

    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    const formattedSong = {
      id: song.id,
      title: song.title,
      titleFR: song.titleFR || '',
      author: song.author,
      composer: song.composer || '',
      key: song.key || 'N/A',
      tempo: song.tempo,
      timeSignature: song.timeSignature || '4/4',
      language: song.language.toLowerCase(),
      style: song.style.toLowerCase(),
      themes: song.themes,
      bibleReferences: song.bibleReferences,
      audioUrl: song.audioUrl || '',
      pdfScoreUrl: song.pdfScoreUrl || '',
      isAiGenerated: song.isAiGenerated,
      usageCount: song.usageCount,
    };

    return NextResponse.json(formattedSong);
  } catch (error: any) {
    console.error('Error fetching song:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/songs/[id]
// Updates metadata of an existing song
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const existingSong = await db.song.findUnique({
      where: { id: params.id },
    });

    if (!existingSong) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    // Map language and style if provided
    let mappedLang: SongLanguage | undefined = undefined;
    if (language) {
      const langUpper = language.toUpperCase();
      if (Object.values(SongLanguage).includes(langUpper as any)) {
        mappedLang = langUpper as SongLanguage;
      }
    }

    let mappedStyle: SongStyle | undefined = undefined;
    if (style) {
      const styleUpper = style.toUpperCase();
      if (Object.values(SongStyle).includes(styleUpper as any)) {
        mappedStyle = styleUpper as SongStyle;
      }
    }

    const updatedSong = await db.song.update({
      where: { id: params.id },
      data: {
        title: title !== undefined ? title : undefined,
        titleFR: titleFR !== undefined ? (titleFR || null) : undefined,
        author: author !== undefined ? author : undefined,
        composer: composer !== undefined ? (composer || null) : undefined,
        themes: themes !== undefined ? themes : undefined,
        bibleReferences: bibleReferences !== undefined ? bibleReferences : undefined,
        key: key !== undefined ? (key || null) : undefined,
        tempo: tempo !== undefined ? (tempo ? parseInt(tempo, 10) : null) : undefined,
        timeSignature: timeSignature !== undefined ? timeSignature : undefined,
        language: mappedLang,
        style: mappedStyle,
        audioUrl: audioUrl !== undefined ? (audioUrl || null) : undefined,
        pdfScoreUrl: pdfScoreUrl !== undefined ? (pdfScoreUrl || null) : undefined,
      },
    });

    const formattedSong = {
      id: updatedSong.id,
      title: updatedSong.title,
      titleFR: updatedSong.titleFR || '',
      author: updatedSong.author,
      composer: updatedSong.composer || '',
      key: updatedSong.key || 'N/A',
      tempo: updatedSong.tempo,
      timeSignature: updatedSong.timeSignature || '4/4',
      language: updatedSong.language.toLowerCase(),
      style: updatedSong.style.toLowerCase(),
      themes: updatedSong.themes,
      bibleReferences: updatedSong.bibleReferences,
      audioUrl: updatedSong.audioUrl || '',
      pdfScoreUrl: updatedSong.pdfScoreUrl || '',
      isAiGenerated: updatedSong.isAiGenerated,
      usageCount: updatedSong.usageCount,
    };

    return NextResponse.json(formattedSong);
  } catch (error: any) {
    console.error('Error updating song:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/songs/[id]
// Deletes a song from the library
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingSong = await db.song.findUnique({
      where: { id: params.id },
    });

    if (!existingSong) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    await db.song.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Song deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting song:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
