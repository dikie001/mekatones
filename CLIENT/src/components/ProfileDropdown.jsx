import { Link } from "react-router-dom";
import { User } from "lucide-react";

export function ProfileDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 bg-gradient-to-br from-purple-900/95 via-slate-800/95 to-purple-900/95 backdrop-blur-xl rounded-2xl p-4 w-56 shadow-2xl border border-purple-500/30">
      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-purple-500/30">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">John Doe</h3>
          <p className="text-sm text-slate-300">dikie@example.com</p>
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
          onClick={onClose}
        >
          Login
        </Link>
        <hr className="border-purple-500/30 my-2" />
        <Link
          to="auth-page"
          className="w-full text-left px-3 py-2 hover:bg-red-600/30 rounded-xl transition-all duration-200 text-sm text-red-400 hover:ring-2 hover:ring-red-400 focus:outline-none"
          onClick={onClose}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
