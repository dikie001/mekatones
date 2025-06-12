import { Link } from "react-router-dom";
import { Upload, PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
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
            <Link to="/library">Explore Music</Link>
          </button>
        </div>
      </div>
    </section>
  );
}