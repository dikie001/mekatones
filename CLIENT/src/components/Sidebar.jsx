import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  X,
  Home,
  Heart,
  Upload,
  BookOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export function Sidebar({ isOpen, onClose }) {
  const [musicMenuOpen, setMusicMenuOpen] = useState(false);

  return (
    <>
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
              onClick={onClose}
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
          onClick={onClose}
        />
      )}
    </>
  );
}
