

import { useState } from "react";
import {Sidebar} from "../components/Sidebar"
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { TrackCard } from "../components/TrackCard";

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const toggleLike = (trackId) => {
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
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Header onSidebarToggle={toggleSidebar} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <HeroSection />

        {/* Tracks Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Recent Tracks</h3>
          <div className="space-y-6">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isPlaying={isPlaying}
                onPlayToggle={() => setIsPlaying(!isPlaying)}
                isLiked={likedTracks.has(track.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
