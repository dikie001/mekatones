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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [musicMenuOpen, setMusicMenuOpen] = useState(false);

  const toggleLike = (trackId:any) => {
    const newLiked = new Set(likedTracks);
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId);
    } else {
      newLiked.add(trackId);
    }
    setLikedTracks(newLiked);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
    {
      id: 3,
      title: "Urban Nights",
      artist: "City Sounds",
      genre: "Hip-Hop",
      duration: "3:28",
      plays: "92K",
      likes: "4.7K",
      avatar: "bg-pink-500",
      waveform: "bg-gradient-to-r from-pink-400 to-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-gradient-to-b from-purple-900/95 via-slate-800/95 to-purple-900/95 backdrop-blur-xl border-r border-purple-500/30 shadow-2xl">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-white">Menu</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-white/10 transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="p-4 space-y-2">
            {/* Home Button */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-slate-600 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none">
              <Home className="w-5 h-5" />
              <Link to="/" className="font-medium">
                Home
              </Link>
            </button>

            {/* Music Menu */}
            <div>
              <button
                onClick={() => setMusicMenuOpen(!musicMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-5 h-5" />
                  <span className="font-medium">Music</span>
                </div>
                {musicMenuOpen ? (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                )}
              </button>

              {/* Music Submenu */}
              <div
                className={`overflow-hidden  transition-all duration-300 ease-in-out ${
                  musicMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-2 space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none text-slate-300 hover:text-white hover:bg-purple-600/20">
                    <PlayCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Recent</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none text-slate-300 hover:text-white hover:bg-purple-600/20">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">Liked</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 mb-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none text-slate-300 hover:text-white hover:bg-purple-600/20">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Button */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none">
              <BookOpen className="w-5 h-5" />
              <Link to="/blog-page" className="font-medium">
                Blog
              </Link>
            </button>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Header */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="absolute left-5">
              <div className="hover:bg-black/30 shadow-xl p-1.5 rounded-full  focus:outline-none">
                <Menu
                  size={32}
                  onClick={toggleSidebar}
                  className="text-white max-md:hidden cursor-pointer"
                />
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center pl-2 space-x-3">
              <div className="w-8 md:ml-15 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MekaTones
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-purple-300 font-medium hover:text-white transition-colors py-2 px-4 hover:ring-2 hover:ring-purple-400 rounded-lg focus:outline-none">
                <Home className="w-5 h-5 inline mr-2" />
                <Link to="/">Home</Link>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors hover:ring-2 hover:ring-purple-400 rounded-lg py-2 px-4 focus:outline-none">
                <BookOpen className="w-5 h-5 inline mr-2" />
                <Link to="/blog-page">Blogs</Link>
              </button>
            </nav>

            {/* Desktop Search & Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/10 rounded-full py-2 pl-10 pr-4 text-sm hover:ring-2 hover:ring-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition-all duration-200"
                />
              </div>
              <div className="relative">
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform hover:ring-2 hover:ring-purple-400 focus:outline-none"
                >
                  <User className="w-5 h-5" />
                </div>
                {showProfile && (
                  <div className="absolute right-0 top-12 bg-gradient-to-br from-purple-900/95 via-slate-800/95 to-purple-900/95 backdrop-blur-xl rounded-2xl p-4 w-56 shadow-2xl border border-purple-500/30">
                    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-purple-500/30">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">John Doe</h3>
                        <p className="text-sm text-slate-300">
                          dikie@example.com
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none">
                        My Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none">
                        My Tracks
                      </button>
                      <button className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none">
                        Settings
                      </button>
                      <Link
                        className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none block"
                        to="/auth-page"
                      >
                        Login
                      </Link>
                      <hr className="border-purple-500/30 my-2" />
                      <Link
                        to="auth-page"
                        className="w-full text-left px-3 py-2 hover:bg-red-600/30 rounded-xl transition-all duration-200 text-sm text-red-400 hover:ring-2 hover:ring-red-400 focus:outline-none"
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:ring-2 hover:ring-purple-400 rounded-lg focus:outline-none transition-all duration-200"
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
                    className="w-full bg-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm hover:ring-2 hover:ring-purple-400 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <BookOpen className="w-5 h-5" />
                    <Link to="/blog-page">Blogs</Link>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:ring-2 hover:ring-purple-400 focus:outline-none transition-all duration-200"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-2xl border border-purple-500/30">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Welcome to MekaTones
            </h2>
            <p className="text-slate-300 text-lg mb-6">
              Discover, share, and create amazing music experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="upload-track"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Upload Track
              </Link>
              <button className="bg-gradient-to-r from-purple-500/20 to-slate-500/20 hover:from-purple-500/30 hover:to-slate-500/30 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 backdrop-blur-sm hover:ring-2 hover:ring-purple-400 focus:outline-none">
                <PlayCircle className="w-5 h-5 inline mr-2" />
                <Link to="/library"> Explore Music</Link>
              </button>
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Recent Tracks</h3>
          <div className="space-y-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200"
              >
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
                        onClick={() => setIsPlaying(!isPlaying)}
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
                          onClick={() => toggleLike(track.id)}
                          className={`p-2 rounded-full transition-all duration-200 hover:ring-2 focus:outline-none ${
                            likedTracks.has(track.id)
                              ? "text-red-400 bg-red-500/20 hover:ring-red-400"
                              : "text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:ring-red-400"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedTracks.has(track.id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:ring-2 hover:ring-purple-400 focus:outline-none">
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
