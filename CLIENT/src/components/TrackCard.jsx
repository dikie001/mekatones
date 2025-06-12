import { useState } from "react";
import { Play, Pause, Heart, Share2, PlayCircle } from "lucide-react";

export function TrackCard({
  track,
  isPlaying,
  onPlayToggle,
  isLiked,
  onToggleLike,
}) {
  return (
    <div className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div
          className={`w-16 h-16 ${track.avatar} rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 shadow-lg`}
        >
          <PlayCircle className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold text-white">
                {track.title}
              </h4>
              <p className="text-slate-400">{track.artist}</p>
              <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mt-2 border border-purple-500/30">
                {track.genre}
              </span>
            </div>
            <button
              onClick={onPlayToggle}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 mx-auto sm:mx-0 shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 ml-1 text-white" />
              )}
            </button>
          </div>

          {/* Waveform */}
          <div className="mb-4">
            <div
              className={`h-12 sm:h-16 ${track.waveform} rounded-lg opacity-30 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center justify-center sm:justify-start space-x-6 text-sm text-slate-400">
              <span className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>{track.plays}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{track.likes}</span>
              </span>
              <span>{track.duration}</span>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => onToggleLike(track.id)}
                className={`p-2 rounded-full transition-all duration-200 hover:ring-2 focus:outline-none ${
                  isLiked
                    ? "text-red-400 bg-red-500/20 hover:ring-red-400"
                    : "text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:ring-red-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:ring-2 hover:ring-purple-400 focus:outline-none">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}