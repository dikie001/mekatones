import { Link } from "react-router-dom";
import { Search, Home, BookOpen, Upload, User } from "lucide-react";

export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <BookOpen className="w-5 h-5" />
            <Link to="/blog-page">Blogs</Link>
          </button>
          <button
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:ring-2 hover:ring-purple-400 focus:outline-none transition-all duration-200"
          >
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}