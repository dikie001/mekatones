import { useState } from "react";

const CLOUD_NAME = "dwqjonzpo";
const UPLOAD_PRESET = "audios";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg"];

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ✅ Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("⚠️ File type not supported. Please upload MP3, WAV, or OGG.");
      return;
    }

    // ✅ Validate file size
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

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
      );

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        setAudioUrl(res.secure_url);
        setUploadProgress(100);
      };

      xhr.onerror = () => {
        setError("❌ Upload failed. Try again.");
      };

      xhr.send(formData);
    } catch (err) {
      setError("❌ Unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 fixed z-60 bg-zinc-900 text-white rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">🎵 Upload Your Audio</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {audioPreview && (
        <div className="mb-4">
          <p className="text-sm text-zinc-400">Preview:</p>
          <audio controls src={audioPreview} className="w-full mt-1" />
        </div>
      )}

      {audioFile && (
        <button
          onClick={handleUpload}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
        >
          Upload
        </button>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full bg-zinc-700 h-3 mt-3 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {audioUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-400">✅ Uploaded!</p>
          <audio controls src={audioUrl} className="w-full mt-1" />
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
