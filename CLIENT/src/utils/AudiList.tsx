import React, { useEffect, useState } from "react";
import axios from "axios";

interface AudioFile {
  url: string;
  public_id: string;
  created_at: string;
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

  if (loading) return <p>Loading audios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🎵 Audio Files</h1>
      {audios.length === 0 && <p>No audios found.</p>}
      {audios.map((audio) => (
        <div key={audio.public_id} className="border p-3 rounded shadow">
          <p className="text-sm text-gray-600">
            {new Date(audio.created_at).toLocaleString()}
          </p>
          <audio controls className="mt-2 w-full">
            <source src={audio.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default AudioList;
