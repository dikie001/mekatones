import React, { useState } from "react";
import {
  Music,
  Upload,
  Users,
  BarChart3,
  Settings,
  Trash2,
  Edit,
  Play,
  Pause,
  Search,
  Filter,
  Plus,
  Eye,
  UserCheck,
  DollarSign,
  Headphones,
  FileX,
  
} from "lucide-react";
import { BiCloudUpload } from "react-icons/bi";
import {toast} from "react-hot-toast";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays: number;
  uploadDate: string;
  status: "active" | "pending" | "archived";
}

interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "premium" | "artist";
  joinDate: string;
  lastActive: string;
}

const MusicAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState<File[]>([]);


  //   File upload Function
  const UploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Publish Tracks
const PublishTracks=()=>{
    toast("This feature is not implemented yet.");

}
  const mockTracks: Track[] = [
    {
      id: "1",
      title: "Midnight Dreams",
      artist: "Luna Echo",
      album: "Night Vibes",
      duration: "3:42",
      plays: 12543,
      uploadDate: "2024-05-15",
      status: "active",
    },
    {
      id: "2",
      title: "Electric Pulse",
      artist: "Neon Waves",
      album: "Synthetic",
      duration: "4:18",
      plays: 8921,
      uploadDate: "2024-05-12",
      status: "active",
    },
  ];

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@email.com",
      plan: "premium",
      joinDate: "2024-03-15",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@email.com",
      plan: "artist",
      joinDate: "2024-04-02",
      lastActive: "1 day ago",
    },
  ];

  const stats = {
    totalTracks: 1247,
    totalUsers: 8934,
    totalPlays: 2456789,
    revenue: 15420,
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
  }: {
    icon: any;
    title: string;
    value: string;
    change: string;
  }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-purple-300" />
        <span className="text-green-400 text-sm font-medium">{change}</span>
      </div>
      <h3 className="text-white/70 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  const TrackRow = ({ track }: { track: Track }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              setIsPlaying(isPlaying === track.id ? null : track.id)
            }
            className="bg-purple-500 hover:bg-purple-600 p-2 rounded-full transition-colors"
          >
            {isPlaying === track.id ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          <div>
            <h4 className="text-white font-medium">{track.title}</h4>
            <p className="text-white/60 text-sm">
              {track.artist} • {track.album}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-white/60 text-sm">{track.duration}</span>
          <span className="text-white/60 text-sm">
            {track.plays.toLocaleString()} plays
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              track.status === "active"
                ? "bg-green-500/20 text-green-400"
                : track.status === "pending"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {track.status}
          </span>
          <div className="flex space-x-2">
            <button className="text-white/60 hover:text-white p-1 rounded">
              <Edit className="h-4 w-4" />
            </button>
            <button className="text-red-400 hover:text-red-300 p-1 rounded">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UserRow = ({ user }: { user: User }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="text-white font-medium">{user.name}</h4>
            <p className="text-white/60 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.plan === "premium"
                ? "bg-purple-500/20 text-purple-400"
                : user.plan === "artist"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {user.plan}
          </span>
          <span className="text-white/60 text-sm">{user.lastActive}</span>
          <div className="flex space-x-2">
            <button className="text-white/60 hover:text-white p-1 rounded">
              <Eye className="h-4 w-4" />
            </button>
            <button className="text-red-400 hover:text-red-300 p-1 rounded">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className={`bg-gradient-to-br min-h-screen overflow-auto from-slate-900 via-purple-900 to-slate-900`}
      >
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">MusicApp Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 min-h-screen">
            <nav className="p-4 space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "tracks", label: "Music Library", icon: Music },
                { id: "users", label: "Users", icon: Users },
                { id: "upload", label: "Upload", icon: Upload },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Dashboard Overview
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Music}
                    title="Total Tracks"
                    value={stats.totalTracks.toLocaleString()}
                    change="+12%"
                  />
                  <StatCard
                    icon={Users}
                    title="Active Users"
                    value={stats.totalUsers.toLocaleString()}
                    change="+8%"
                  />
                  <StatCard
                    icon={Headphones}
                    title="Total Plays"
                    value={`${(stats.totalPlays / 1000000).toFixed(1)}M`}
                    change="+23%"
                  />
                  <StatCard
                    icon={DollarSign}
                    title="Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    change="+15%"
                  />
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        New track "Midnight Dreams" uploaded by Luna Echo
                      </span>
                      <span className="text-white/40 text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Premium user Sarah Chen upgraded plan</span>
                      <span className="text-white/40 text-sm">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Track "Electric Pulse" reached 10k plays</span>
                      <span className="text-white/40 text-sm">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tracks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Music Library
                  </h2>
                  <div className="flex space-x-3">
                    <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Track</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockTracks.map((track) => (
                    <TrackRow key={track.id} track={track} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    User Management
                  </h2>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Invite User</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* Uploads */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Upload Music</h2>
                    
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center hover:border-purple-400 transition-colors">
                    <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Upload Audio Files
                    </h3>
                    <p className="text-white/60 mb-4">
                      Drag and drop your music files here, or click to browse
                    </p>
                    {/* Upload Button */}
                    <div className="relative  inline-block">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer  inline-flex items-center px-4 py-2 bg-gradient-to-bl from-purple-600 to-blue-700 hover:bg-indigo-700 text-white  font-medium h-10 md:h-12 rounded-lg shadow-md transition"
                      >
                        <BiCloudUpload className="mr-2" size={25} /> Upload
                        File(s)
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={UploadFile} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="w-full max-h-100 overflow-auto max-w-xl mt-5 mx-auto p-6 flex flex-col rounded-xl bg-gradient-to-br from-purple-900/20 via-slate-800/30 to-purple-800/20 border border-purple-500/30 shadow-2xl backdrop-blur-xl">
                      {/* Div for files to be uploaded */}
                      <div className="flex items-center justify-center p-4 mb-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-slate-600/10 border border-purple-400/20 backdrop-blur-sm">
                        {files.length > 0 ? (
                          <div className="flex items-center space-x-3 text-purple-200">
                            <div className="p-2 bg-purple-500/20 rounded-full border border-purple-400/30">
                              <Upload className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="font-semibold text-lg bg-gradient-to-r from-purple-300 to-slate-300 bg-clip-text text-transparent">
                              Files to be Uploaded
                            </span>
                            <div className="px-2 py-1 bg-purple-500/30 rounded-full border border-purple-400/40">
                              <span className="text-xs font-bold text-purple-200">
                                {files.length}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3 text-slate-400">
                            <div className="p-2 bg-slate-600/20 rounded-full border border-slate-500/30">
                              <FileX className="w-5 h-5 text-slate-500" />
                            </div>
                            <span className="font-medium text-lg text-slate-400">
                              No Files to Upload
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="group flex items-center justify-between p-3 bg-gradient-to-r from-slate-800/40 to-purple-900/30 rounded-lg shadow-lg border border-purple-400/20 hover:border-purple-400/50 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-purple-800/40 transition-all duration-300 hover:shadow-purple-500/25 hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            <span className="font-medium text-slate-200 flex items-center min-w-0 flex-1">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                {index + 1}
                              </span>
                              <span className="group-hover:text-purple-200 transition-colors duration-200 truncate">
                                {file.name}
                              </span>
                            </span>
                            <span className="text-slate-300 text-xs font-medium px-2 py-1 bg-slate-700/50 rounded-full border border-slate-600/50 ml-2 flex-shrink-0">
                              {(file.size / (1024 * 1024)).toFixed(1)} mbs
                            </span>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-8 grid  grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block  text-white/80 text-sm font-medium mb-2">
                        Track Title
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter track title"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Artist Name
                      </label>0734903146
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter artist name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Album
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter album name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Genre
                      </label>
                      <select className="w-full bg-white/90 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select genre</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="electronic">Electronic</option>
                        <option value="jazz">Jazz</option>
                        <option value="classical">Classical</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="mt-6 flex justify-end space-x-4">
                    <button className={`bg-white/10 border ${files.length === 0 && 'hidden'}  border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors`}>
                      Save as Draft
                    </button>
                    <button onClick={PublishTracks} className={`${files.length === 0 && 'hidden'} bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors`}>
                      {files.length > 1 && `Publish ${files.length} Tracks`}
                      {files.length === 1 && 'Publish Track'}
                 
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Settings</h2>

                <div className="grid gap-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      App Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          App Name
                        </label>
                        <input
                          type="text"
                          defaultValue="MusicApp"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Max Upload Size (MB)
                        </label>
                        <input
                          type="number"
                          defaultValue="50"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Payment Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Premium Price ($/month)
                        </label>
                        <input
                          type="number"
                          defaultValue="9.99"
                          step="0.01"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Artist Plan Price ($/month)
                        </label>
                        <input
                          type="number"
                          defaultValue="19.99"
                          step="0.01"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>


      {/* {fileModal && (
        <div className="fixed inset-0 Z-59 flex items-center justify-center bg-gradient-to-br from-black/60 via-purple-900/30 to-slate-900/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-gradient-to-br from-purple-950/90 via-slate-900/95 to-purple-900/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 rounded-2xl w-full max-w-sm sm:max-w-md mx-auto text-white flex flex-col items-center gap-6 p-6 sm:p-8 transform animate-in fade-in-0 zoom-in-95 duration-300">
            <XIcon
              onClick={() => setFileModal((prev) => !prev)}
              className="absolute top-2 right-4 hover:rotate-90 transition-transform duration-300 "
            />
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-200 to-slate-200 bg-clip-text text-transparent text-center">
              Select File Upload Mode
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <button
                onClick={() => setType("single")}
                className="flex-1 bg-gradient-to-r from-purple-700/80 to-purple-600/80 hover:from-purple-600/90 hover:to-purple-500/90 border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
              >
                <FilePlus size={18} className="text-purple-200" />
                <span>Single File</span>
              </button>
              <button
                onClick={() => setType("multiple")}
                className="flex-1 bg-gradient-to-r from-slate-700/80 to-slate-600/80 hover:from-slate-600/90 hover:to-slate-500/90 border border-slate-400/30 hover:border-slate-300/50 transition-all duration-300 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base font-semibold shadow-lg hover:shadow-slate-500/25 hover:scale-105 transform"
              >
                <Files size={18} className="text-slate-200" />
                <span>Multiple Files</span>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MusicAdminDashboard;
