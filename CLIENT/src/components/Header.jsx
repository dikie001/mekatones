import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  Search,
  User,
  Menu,
  X,
  Home,
  BookOpen,
} from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { MobileMenu } from "./MobileMenu";

export function Header({ onSidebarToggle }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="absolute left-5">
            <div className="hover:bg-black/30 shadow-xl p-1.5 rounded-full focus:outline-none">
              <Menu
                size={32}
                onClick={onSidebarToggle}
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
            <Link
              to="/"
              className="text-purple-300 font-medium hover:text-white transition-colors py-2 px-4 hover:ring-2 hover:ring-purple-400 rounded-lg focus:outline-none"
            >
              <Home className="w-5 h-5 inline mr-2" />
              Home
            </Link>
            <Link
              to="/blog-page"
              className="text-gray-300 hover:text-white transition-colors hover:ring-2 hover:ring-purple-400 rounded-lg py-2 px-4 focus:outline-none"
            >
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
              <ProfileDropdown
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
              />
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

        <MobileMenu
          isOpen={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
        />
      </div>
    </header>
  );
}