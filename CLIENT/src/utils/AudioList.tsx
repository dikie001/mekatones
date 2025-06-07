import React, { useEffect, useState } from "react";
import axios from "axios";
import { Music, Calendar, Loader2, AlertCircle } from "lucide-react";

interface AudioFile {
  url: string;
  public_id: string;
  created_at: string;
  display_name:string;
}

const AudioList: React.FC = () => {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAudios = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/audios");
        setAudios(res.data);
      } catch (err) {
        setError("Failed to fetch audio files");
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-purple-300 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 rounded-full animate-pulse mx-auto"></div>
          </div>
          <p className="text-purple-200 text-lg font-medium">
            Loading audios...
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-800">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-slate-600/20"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-slate-500 rounded-2xl mb-6 shadow-2xl">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-200 to-slate-200 bg-clip-text text-transparent mb-4">
              🎵 Audio Files
            </h1>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Your curated collection of audio files
            </p>
            {audios.length > 0 && (
              <div className="mt-6 text-purple-300">
                <span className="text-sm font-medium">
                  {audios.length} files available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {audios.length === 0 ? (
          <div className="text-center py-16">
            <Music className="w-24 h-24 text-purple-400/50 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No audios found
            </h3>
            <p className="text-purple-200">Your audio collection is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {audios.map((audio, index) => (
              <div
                key={audio.public_id}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-slate-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-slate-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Music className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Audio File
                      </h3>
                      <div className="flex items-center text-purple-300 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(audio.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="text-purple-300 text-sm font-mono bg-white/5 px-3 py-1 rounded-lg">
                    {audio.display_name}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <audio controls className="w-full h-12 rounded-lg">
                      <source src={audio.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        audio {
          filter: invert(1) hue-rotate(180deg);
        }

        audio::-webkit-media-controls-panel {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AudioList;
