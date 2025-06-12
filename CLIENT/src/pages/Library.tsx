import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Music,
  Calendar,
  Loader2,
  AlertCircle,
  Play,
  Pause,
  Download,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

// Interface for audio file structure
interface AudioFile {
  url: string;
  public_id: string;
  created_at: string;
  name: string;
  size: number;
}

// Interface for audio state management
interface AudioState {
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
  isLoaded: boolean;
}

const Library: React.FC = () => {
  // Main state for audio files and loading
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Audio playback state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioStates, setAudioStates] = useState<{ [key: string]: AudioState }>(
    {}
  );
  const [globalVolume, setGlobalVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(0.7);

  // Refs for audio elements and update intervals
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetch audio files from API with loading state management
   * Includes artificial delay for better UX (prevents flash)
   */
  useEffect(() => {
    const fetchAudios = async () => {
      try {
        // Parallel fetch with minimum loading time for better UX
        const [res] = await Promise.all([
          fetch("http://localhost:3000/api/audios"),
          new Promise((resolve) => setTimeout(resolve, 800)), // Reduced from 1500ms
        ]);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setAudios(data);

        // Initialize audio states for all files
        const initialStates: { [key: string]: AudioState } = {};
        data.forEach((audio: AudioFile) => {
          initialStates[audio.public_id] = {
            currentTime: 0,
            duration: 0,
            volume: globalVolume,
            isPlaying: false,
            isLoaded: false,
          };
        });
        setAudioStates(initialStates);
      } catch (err) {
        console.error("Failed to fetch audios:", err);
        setError("Failed to fetch audio files. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, [globalVolume]);

  /**
   * Update audio progress and states every second when playing
   * Optimized to only run when needed
   */
  useEffect(() => {
    if (playingId) {
      intervalRef.current = setInterval(() => {
        const audio = audioRefs.current[playingId];
        if (audio && !audio.paused) {
          setAudioStates((prev) => ({
            ...prev,
            [playingId]: {
              ...prev[playingId],
              currentTime: audio.currentTime,
              duration: audio.duration || 0,
            },
          }));
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playingId]);

  /**
   * Format date string to readable format
   * Memoized for performance
   */
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  /**
   * Format file size in bytes to readable format
   * Optimized with better size calculations
   */
  const formatSize = useCallback((bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }, []);

  /**
   * Format time in seconds to MM:SS format
   */
  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  /**
   * Handle play/pause functionality with improved state management
   * Stops other audio when playing a new one
   */
  const handlePlay = useCallback(
    (audioId: string) => {
      const audio = audioRefs.current[audioId];
      if (!audio) return;

      // Pause currently playing audio if different
      if (playingId && playingId !== audioId) {
        const currentAudio = audioRefs.current[playingId];
        if (currentAudio) {
          currentAudio.pause();
          setAudioStates((prev) => ({
            ...prev,
            [playingId]: { ...prev[playingId], isPlaying: false },
          }));
        }
      }

      // Toggle play/pause for selected audio
      if (playingId === audioId && !audio.paused) {
        audio.pause();
        setPlayingId(null);
        setAudioStates((prev) => ({
          ...prev,
          [audioId]: { ...prev[audioId], isPlaying: false },
        }));
      } else {
        audio.play().catch(console.error);
        setPlayingId(audioId);
        setAudioStates((prev) => ({
          ...prev,
          [audioId]: { ...prev[audioId], isPlaying: true },
        }));
      }
    },
    [playingId]
  );

  /**
   * Handle seeking to specific time position
   */
  const handleSeek = useCallback((audioId: string, time: number) => {
    const audio = audioRefs.current[audioId];
    if (audio && audio.duration) {
      audio.currentTime = time;
      setAudioStates((prev) => ({
        ...prev,
        [audioId]: { ...prev[audioId], currentTime: time },
      }));
    }
  }, []);

  /**
   * Skip forward/backward by 10 seconds
   */
  const handleSkip = useCallback(
    (audioId: string, direction: "forward" | "backward") => {
      const audio = audioRefs.current[audioId];
      if (audio) {
        const skipAmount = direction === "forward" ? 10 : -10;
        const newTime = Math.max(
          0,
          Math.min(audio.duration, audio.currentTime + skipAmount)
        );
        handleSeek(audioId, newTime);
      }
    },
    [handleSeek]
  );

  /**
   * Handle volume changes with mute state management
   */
  const handleVolumeChange = useCallback((volume: number) => {
    setGlobalVolume(volume);
    setIsMuted(volume === 0);

    // Apply to all audio elements
    Object.values(audioRefs.current).forEach((audio) => {
      audio.volume = volume;
    });

    // Update all audio states
    setAudioStates((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = { ...updated[id], volume };
      });
      return updated;
    });
  }, []);

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(() => {
    if (isMuted) {
      handleVolumeChange(previousVolume);
    } else {
      setPreviousVolume(globalVolume);
      handleVolumeChange(0);
    }
  }, [isMuted, globalVolume, previousVolume, handleVolumeChange]);

  /**
   * Optimized download function with better error handling
   */
  const handleDownload = useCallback(async (audioFile: AudioFile) => {
    try {
      // Show loading state could be added here
      const response = await fetch(audioFile.url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = audioFile.name || `audio_${audioFile.public_id}`;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Could show user notification here
    }
  }, []);

  /**
   * Handle audio element events
   */
  const setupAudioEvents = useCallback(
    (audio: HTMLAudioElement, audioId: string) => {
      const handleLoadedMetadata = () => {
        setAudioStates((prev) => ({
          ...prev,
          [audioId]: {
            ...prev[audioId],
            duration: audio.duration,
            isLoaded: true,
          },
        }));
      };

      const handleEnded = () => {
        setPlayingId(null);
        setAudioStates((prev) => ({
          ...prev,
          [audioId]: {
            ...prev[audioId],
            isPlaying: false,
            currentTime: 0,
          },
        }));
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);
      audio.volume = globalVolume;

      // Cleanup function
      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    },
    [globalVolume]
  );

  // Loading state component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-purple-300 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 rounded-full animate-pulse mx-auto"></div>
          </div>
          <p className="text-purple-200 text-lg font-medium">
            Loading your music...
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state component
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800">
      {/* Header Section */}
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

          {/* File count and global controls */}
          {audios.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-purple-300 text-sm">
                {audios.length} file{audios.length !== 1 ? "s" : ""} available
              </div>

              {/* Global Volume Control */}
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <button
                  onClick={toggleMute}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  {isMuted || globalVolume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={globalVolume}
                  onChange={(e) =>
                    handleVolumeChange(parseFloat(e.target.value))
                  }
                  className="w-20 h-1 bg-purple-300/30 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-purple-300 text-xs w-8 text-right">
                  {Math.round(globalVolume * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        {audios.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No audio files found
            </h3>
            <p className="text-purple-200 text-sm">
              Your music library is waiting for some tunes
            </p>
          </div>
        ) : (
          // Audio files list
          <div className="space-y-4 max-w-3xl m-auto  w-full flex flex-col ">
            {audios.map((audio, index) => {
              const audioState = audioStates[audio.public_id] || {};
              const isCurrentlyPlaying = playingId === audio.public_id;
              const progress = audioState.duration
                ? (audioState.currentTime / audioState.duration) * 100
                : 0;

              return (
                <div
                  key={audio.public_id}
                  className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`, // Reduced delay
                  }}
                >
                  {/* Audio file header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-slate-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-sm sm:text-base font-semibold text-white truncate"
                        title={audio.name}
                      >
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
                        {audioState.duration && (
                          <span className="text-purple-300">
                            {formatTime(audioState.duration)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Audio Controls */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
                    {/* Progress bar */}
                    {audioState.duration > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-purple-300">
                          <span>{formatTime(audioState.currentTime || 0)}</span>
                          <span>{formatTime(audioState.duration)}</span>
                        </div>
                        <div
                          className="w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden"
                          onClick={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            const percent =
                              (e.clientX - rect.left) / rect.width;
                            const newTime = percent * audioState.duration;
                            handleSeek(audio.public_id, newTime);
                          }}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-slate-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Control buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Skip backward */}
                        <button
                          onClick={() =>
                            handleSkip(audio.public_id, "backward")
                          }
                          disabled={!audioState.isLoaded}
                          className="w-8 h-8 bg-white/10 hover:bg-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                        >
                          <SkipBack className="w-4 h-4 text-white" />
                        </button>

                        {/* Play/Pause button */}
                        <button
                          onClick={() => handlePlay(audio.public_id)}
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-slate-500 hover:from-purple-600 hover:to-slate-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                          {isCurrentlyPlaying && audioState.isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </button>

                        {/* Skip forward */}
                        <button
                          onClick={() => handleSkip(audio.public_id, "forward")}
                          disabled={!audioState.isLoaded}
                          className="w-8 h-8 bg-white/10 hover:bg-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                        >
                          <SkipForward className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Download button */}
                      <button
                        onClick={() => handleDownload(audio)}
                        className="w-10 h-10 bg-white/10 hover:bg-purple-500/20 hover:text-purple-300 rounded-full flex items-center justify-center transition-colors"
                        title={`Download ${audio.name}`}
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    {/* Hidden audio element for each file */}
                    <audio
                      ref={(el) => {
                        if (el) {
                          audioRefs.current[audio.public_id] = el;
                          setupAudioEvents(el, audio.public_id);
                        }
                      }}
                      src={audio.url}
                      preload="metadata" // Only load metadata, not full audio
                      className="hidden" // Hide native controls completely
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Optimized CSS animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom range slider styling */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #64748b);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #64748b);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Library;
