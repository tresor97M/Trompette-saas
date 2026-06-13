'use client';

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
  coverArt?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  className?: string;
}

export function AudioPlayer({
  src,
  title = 'Untitled',
  artist = 'Unknown Artist',
  coverArt,
  autoPlay = false,
  onEnded,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
        onEnded?.();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, onEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (!audioRef.current || !src) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const skipBack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, currentTime - 10);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, currentTime + 10);
  };

  const formatTime = (time: number): string => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4 shadow-card',
        className
      )}
    >
      <audio ref={audioRef} src={src} autoPlay={autoPlay} />

      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        {coverArt ? (
          <img
            src={coverArt}
            alt={title}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-brand-gold-500 to-brand-gold-600 flex items-center justify-center">
            <ListMusic className="h-8 w-8 text-brand-blue-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{title}</h4>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleShuffle}
          >
            <Shuffle
              className={cn('h-4 w-4', isShuffle && 'text-brand-gold-500')}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={skipBack}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="default"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full',
            'bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-500'
          )}
          onClick={togglePlayPause}
          disabled={!src}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={skipForward}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleRepeat}
          >
            <Repeat
              className={cn('h-4 w-4', isRepeat && 'text-brand-gold-500')}
            />
          </Button>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 cursor-pointer"
        />
      </div>
    </div>
  );
}

// Mini player variant
interface MiniPlayerProps {
  title?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  progress?: number;
  className?: string;
}

export function MiniPlayer({
  title = 'Now Playing',
  isPlaying = false,
  onPlayPause,
  progress = 0,
  className,
}: MiniPlayerProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg bg-muted/50 p-2',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-brand-gold-500 text-brand-blue-500"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <div className="h-1 w-full bg-muted rounded-full mt-1">
          <div
            className="h-full bg-brand-gold-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
