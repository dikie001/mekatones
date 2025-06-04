import React, { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  Share2,
  Upload,
  Search,
  Home,
  Compass,
  Library,
  User,
  Settings,
  Bell,
  Plus,
  MoreHorizontal,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  MessageCircle,
  Repeat2,
  TrendingUp,
  Clock,
  PlayCircle,
} from "lucide-react";

export default function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [likedTracks, setLikedTracks] = useState(new Set());

  const toggleLike = (trackId: any) => {
    const newLiked = new Set(likedTracks);
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId);
    } else {
      newLiked.add(trackId);
    }
    setLikedTracks(newLiked);
  };

  const tracks = [
    {
      id: 1,
      title: "Midnight Echoes",
      artist: "Luna Waves",
      genre: "Electronic",
      duration: "3:42",
      plays: "127K",
      likes: "5.2K",
      avatar: "bg-purple-500",
      waveform: "bg-gradient-to-r from-purple-400 to-pink-400",
    },
    {
      id: 2,
      title: "Urban Dreams",
      artist: "City Lights",
      genre: "Hip Hop",
      duration: "4:15",
      plays: "89K",
      likes: "3.8K",
      avatar: "bg-blue-500",
      waveform: "bg-gradient-to-r from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      title: "Acoustic Soul",
      artist: "River Stone",
      genre: "Folk",
      duration: "5:28",
      plays: "234K",
      likes: "12.1K",
      avatar: "bg-green-500",
      waveform: "bg-gradient-to-r from-green-400 to-emerald-400",
    },
  ];

  const trendingTracks = [
    { id: 4, title: "Neon Nights", artist: "Synth Master", plays: "1.2M" },
    { id: 5, title: "Ocean Breeze", artist: "Coastal Vibes", plays: "892K" },
    { id: 6, title: "Fire Storm", artist: "Rock Legends", plays: "756K" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MekaTones
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for tracks, artists, or genres..."
                  className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-xl bg-black/20 border-r border-white/10 min-h-screen sticky top-16">
          <nav className="p-6">
            <div className="space-y-2 mb-8">
              {[
                { icon: Home, label: "Home", id: "home" },
                { icon: Compass, label: "Discover", id: "discover" },
                { icon: Library, label: "Library", id: "library" },
                { icon: TrendingUp, label: "Trending", id: "trending" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
                  <Plus className="w-5 h-5" />
                  <span>Create Playlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
                  <Upload className="w-5 h-5" />
                  <span>Upload Track</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">
                  Discover Amazing Music
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Upload, share, and explore the best tracks from artists
                  worldwide
                </p>
                <div className="flex space-x-4">
                  <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Start Listening
                  </button>
                  <button className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </section>

          {/* Upload Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Upload Your Music</h3>
                <Upload className="w-8 h-8 text-blue-400" />
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8" />
                </div>
                <p className="text-lg font-semibold mb-2">
                  Drag & drop your audio files here
                </p>
                <p className="text-gray-400">
                  or click to browse (MP3, WAV, FLAC supported)
                </p>
                <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                  Select Files
                </button>
              </div>
            </div>
          </section>

          {/* Featured Tracks */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Featured Tracks</h3>
              <button className="text-purple-400 hover:text-purple-300 font-semibold">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 ${track.avatar} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <PlayCircle className="w-8 h-8" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {track.title}
                          </h4>
                          <p className="text-gray-400">{track.artist}</p>
                          <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mt-2">
                            {track.genre}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110"
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5 ml-1" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Waveform Visualization */}
                      <div className="mb-4">
                        <div
                          className={`h-16 ${track.waveform} rounded-lg opacity-30 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
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

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleLike(track.id)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              likedTracks.has(track.id)
                                ? "text-red-400 bg-red-500/20"
                                : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                likedTracks.has(track.id) ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                            <Repeat2 className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                            <Share2 className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trending Tracks */}
              <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingTracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className="text-2xl font-bold text-orange-400 w-8">
                        #{index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold">{track.title}</p>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {track.plays}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">Alex Chen</span> liked
                        your track
                      </p>
                      <p className="text-xs text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">Sarah Kim</span> shared
                        your playlist
                      </p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">Mike Johnson</span>{" "}
                        started following you
                      </p>
                      <p className="text-xs text-gray-400">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-black/40 border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Current Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">Midnight Echoes</p>
              <p className="text-sm text-gray-400 truncate">Luna Waves</p>
            </div>
            <button className="text-gray-400 hover:text-red-400 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Shuffle className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Repeat className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3 w-full">
              <span className="text-xs text-gray-400">1:23</span>
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-400">3:42</span>
            </div>
          </div>

          {/* Volume & Options */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="w-24 bg-gray-700 rounded-full h-1">
              <div className="bg-white h-1 rounded-full w-2/3"></div>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
