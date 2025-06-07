import { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  Share2,
  Upload,
  Search,
  Home,
  User,
  PlayCircle,
  X,
  Menu,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MusicSharingApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleLike = (trackId:any) => {
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
      title: "Summer Vibes",
      artist: "Coastal Beats",
      genre: "Chill",
      duration: "4:15",
      plays: "84K",
      likes: "3.1K",
      avatar: "bg-blue-500",
      waveform: "bg-gradient-to-r from-blue-400 to-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MekaTones
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-purple-300 font-medium hover:text-white transition-colors">
                <Home className="w-5 h-5 inline mr-2" />
                Home
              </button>
              <Link to='/blog-page' className="text-gray-300 hover:text-white transition-colors">
                <BookOpen className="w-5 h-5 inline mr-2" />
                Blogs
              </Link>
            </nav>

            {/* Desktop Search & Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <User className="w-5 h-5" />
                </div>
                {showProfile && (
                  <div className="absolute right-0 top-12 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-3 w-48">
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">
                        My Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">
                        My Tracks
                      </button>
                      <Link
                        className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                        to="/auth-page"
                      >
                        Login
                      </Link>
                      <hr className="border-white/20 my-2" />
                      <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm text-red-400">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:bg-white/10 rounded-lg transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors">
                    <BookOpen className="w-5 h-5" />
                    <Link to="/blog-page">Blogs</Link>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium">
                    <Upload className="w-5 h-5" />
                    <span>Upload</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tracks Section */}
        <section>
          <h3 className="text-xl sm:text-2xl font-bold mb-6">Recent Tracks</h3>
          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div
                    className={`w-16 h-16 ${track.avatar} rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0`}
                  >
                    <PlayCircle className="w-8 h-8" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-3 sm:space-y-0">
                      <div className="text-center sm:text-left">
                        <h4 className="text-lg font-semibold text-white">
                          {track.title}
                        </h4>
                        <p className="text-gray-400">{track.artist}</p>
                        <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mt-2">
                          {track.genre}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 mx-auto sm:mx-0"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-1" />
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
                      <div className="flex items-center justify-center sm:justify-start space-x-6 text-sm text-gray-400">
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
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
