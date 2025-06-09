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
  Music,
  FileMusic,
} from "lucide-react";
import { Link } from "react-router-dom";

const CLOUD_NAME = "dwqjonzpo";
const UPLOAD_PRESET = "audios"; // ✅ This must match your Cloudinary unsigned preset name
const MAX_FILE_SIZE_MB = 20;
const ALLOWED_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg"];

const UploadTrack = () => {
  // Upload states
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Navigation states
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [musicMenuOpen, setMusicMenuOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("📁 Selected file:", file);

    // ✅ Check type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("⚠️ File type not supported. Please upload MP3, WAV, or OGG.");
      return;
    }

    // ✅ Check size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`⚠️ File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    setAudioFile(file);
    setAudioPreview(URL.createObjectURL(file));
    setAudioUrl(null);
  };

  const handleUpload = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    console.log("🚀 Uploading file to Cloudinary...");
    console.log(
      "🌐 Endpoint:",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
    );
    console.log("📦 FormData entries:", [...formData.entries()]);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(`POST`, `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`);

      // 🔄 Progress bar update
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          console.log(`📊 Upload progress: ${percent}%`);
          setUploadProgress(percent);
        }
      };

      // ✅ On success
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        console.log("✅ Cloudinary Response:", res);

        if (xhr.status === 200) {
          setAudioUrl(res.secure_url);
          setUploadProgress(100);
        } else {
          setError(
            `❌ Upload failed: ${res?.error?.message || "Unknown error"}`
          );
        }
      };

      // ❌ On error
      xhr.onerror = () => {
        console.error("🔥 Network/Upload error");
        setError("❌ Upload failed. Try again.");
      };

      xhr.send(formData);
    } catch (err) {
      console.error("💥 Unexpected Error:", err);
      setError("❌ Unexpected error occurred.");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none">
              <Home className="w-5 h-5" />
              <Link to='/' className="font-medium">Home</Link>
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
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
                  <button className="w-full flex items-center space-x-3 px-4 py-2 mb-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none bg-gradient-to-r from-purple-600 to-slate-600 text-white">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Button */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none">
              <BookOpen className="w-5 h-5" />
              <Link to='/blog-page' className="font-medium">Blog</Link>
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
              <div className="hover:bg-black/30 shadow-xl p-1.5 rounded-full focus:outline-none">
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
                <PlayCircle className="w-4  h-4 sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-xl  sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MekaTones
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:ring-2 hover:ring-purple-400 rounded-lg focus:outline-none">
                <Home className="w-5 h-5 inline mr-2" />
                <Link to='/'>Home</Link>
              </button>
              <button className="text-purple-300 font-medium hover:text-white transition-colors hover:ring-2 hover:ring-purple-400 rounded-lg py-2 px-4 focus:outline-none">
                <FileMusic className="w-5 h-5 inline mr-2" />
                <Link to='/library'>Library</Link>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors hover:ring-2 hover:ring-purple-400 rounded-lg py-2 px-4 focus:outline-none">
                <BookOpen className="w-5 h-5 inline mr-2" />
                <Link to='/blog-page'>Blogs</Link>
              </button>
            </nav>

            {/* Desktop Search & Profile */}
            <div className="hidden md:flex items-center space-x-4">
            
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
                      <Link to='/auth-page' className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none">
                        Login
                      </Link>
                      <hr className="border-purple-500/30 my-2" />
                      <button className="w-full text-left px-3 py-2 hover:bg-red-600/30 rounded-xl transition-all duration-200 text-sm text-red-400 hover:ring-2 hover:ring-red-400 focus:outline-none">
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
               
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <Home className="w-5 h-5" />
                    <Link to="/">Home</Link>
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
                    <BookOpen className="w-5 h-5" />
                    <Link to='/blog-page'>Blogs</Link>
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
        {/* Upload Section */}
        <section className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/30">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                🎵 Upload Your Audio
              </h2>
              <p className="text-slate-300">Share your music with the world</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Choose Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="w-full bg-white/10 border border-purple-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-white/15 transition-all duration-200"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Supported formats: MP3, WAV, OGG • Max size:{" "}
                  {MAX_FILE_SIZE_MB}MB
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {audioPreview && (
                <div className="bg-white/5 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-sm text-slate-300 mb-2">Preview:</p>
                  <audio controls src={audioPreview} className="w-full" />
                </div>
              )}

              {audioFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {uploadProgress > 0 && uploadProgress < 100 ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading... {uploadProgress}%</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Upload Track</span>
                    </span>
                  )}
                </button>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {audioUrl && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <PlayCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-green-400 font-medium">
                      ✅ Upload Successful!
                    </p>
                  </div>
                  <audio controls src={audioUrl} className="w-full" />
                  <div className="mt-3 p-2 bg-white/5 rounded border">
                    <p className="text-xs text-slate-400 mb-1">
                      Shareable URL:
                    </p>
                    <p className="text-xs text-slate-300 break-all">
                      {audioUrl}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UploadTrack;
