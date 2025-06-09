import React, { useEffect, useState, useRef } from "react";
import {
  Music,
  Calendar,
  Loader2,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react";

interface AudioFile {
  url: string;
  public_id: string;
  created_at: string;
  name: string;
  size: number;
}

interface CachedAudio {
  blob: Blob;
  duration: number;
  currentTime: number;
}

const Library: React.FC = () => {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cachedAudios, setCachedAudios] = useState<Map<string, CachedAudio>>(
    new Map()
  );
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingCache, setLoadingCache] = useState<Set<string>>(new Set());
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const fetchAudios = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/audios");
        const data = await res.json();
        setAudios(data);
      } catch (err) {
        setError("Failed to fetch audio files");
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  const cacheAudio = async (audioFile: AudioFile) => {
    if (
      cachedAudios.has(audioFile.public_id) ||
      loadingCache.has(audioFile.public_id)
    )
      return;

    setLoadingCache((prev) => new Set(prev).add(audioFile.public_id));

    try {
      const response = await fetch(audioFile.url);
      const blob = await response.blob();

      const audio = new Audio();
      const objectUrl = URL.createObjectURL(blob);
      audio.src = objectUrl;

      await new Promise((resolve, reject) => {
        audio.addEventListener("loadedmetadata", resolve);
        audio.addEventListener("error", reject);
      });

      setCachedAudios((prev) =>
        new Map(prev).set(audioFile.public_id, {
          blob,
          duration: audio.duration,
          currentTime: 0,
        })
      );
    } catch (error) {
      console.error("Failed to cache audio:", error);
    } finally {
      setLoadingCache((prev) => {
        const newSet = new Set(prev);
        newSet.delete(audioFile.public_id);
        return newSet;
      });
    }
  };

  const handlePlay = async (audioFile: AudioFile) => {
    const audio = audioRefs.current.get(audioFile.public_id);
    if (!audio) return;

    if (playingId && playingId !== audioFile.public_id) {
      const currentAudio = audioRefs.current.get(playingId);
      if (currentAudio) currentAudio.pause();
    }

    if (playingId === audioFile.public_id) {
      audio.pause();
      setPlayingId(null);
    } else {
      await cacheAudio(audioFile);
      const cached = cachedAudios.get(audioFile.public_id);
      if (cached) {
        audio.currentTime = cached.currentTime;
      }
      audio.play();
      setPlayingId(audioFile.public_id);
    }
  };

  const handleTimeUpdate = (audioFile: AudioFile, currentTime: number) => {
    setCachedAudios((prev) => {
      const cached = prev.get(audioFile.public_id);
      if (cached) {
        return new Map(prev).set(audioFile.public_id, {
          ...cached,
          currentTime,
        });
      }
      return prev;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSize = (bytes: number) => {
    return bytes > 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-300 animate-spin mx-auto mb-4" />
          <p className="text-purple-200">Loading audios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800">
      {/* Header */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-slate-500 rounded-xl mb-4 shadow-xl">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-200 to-slate-200 bg-clip-text text-transparent mb-2">
            🎵 Audio Library
          </h1>
          <p className="text-purple-200 text-sm sm:text-base">
            Your curated collection of audio files
          </p>
          {audios.length > 0 && (
            <div className="mt-4 text-purple-300 text-sm">
              {audios.length} files available
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        {audios.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No audios found
            </h3>
            <p className="text-purple-200 text-sm">
              Your audio collection is empty
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {audios.map(function (audio) {
              const cached = cachedAudios.get(audio.public_id);
              const isPlaying = playingId === audio.public_id;
              const isCaching = loadingCache.has(audio.public_id);

              return (
                <div
                  key={audio.public_id}
                  className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Audio Info */}
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-slate-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Music className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                          {audio.name}
                        </h3>
                        <div className="flex items-center text-purple-300 text-xs sm:text-sm gap-3">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(audio.created_at)}
                          </span>
                          <span className="bg-white/10 px-2 py-1 rounded text-xs">
                            {formatSize(audio.size)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Custom Audio Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePlay(audio)}
                        disabled={isCaching}
                        className="w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        {isCaching ? (
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        ) : isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        )}
                      </button>

                      {cached && (
                        <div className="flex items-center gap-2 text-xs text-purple-300">
                          <span>{formatTime(cached.currentTime)}</span>
                          <div className="w-16 sm:w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-400 transition-all duration-300"
                              style={{
                                width: `${(cached.currentTime / cached.duration) * 100}%`,
                              }} />
                          </div>
                          <span>{formatTime(cached.duration)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hidden Audio Element */}
                  <audio
                    ref={(el) => {
                      if (el) {
                        audioRefs.current.set(audio.public_id, el);
                      }
                    } }
                    src={cached ? URL.createObjectURL(cached.blob) : audio.url}
                    onTimeUpdate={(e) => handleTimeUpdate(audio, e.currentTarget.currentTime)}
                    onEnded={() => setPlayingId(null)}
                    preload="none"
                    className="hidden" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
