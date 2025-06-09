import { useState } from "react";
import {
  BookOpen,
  Home,
  Menu,
  PenTool,
  Plus,
  Save,
  Search,
  Upload,
  User,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function BlogPage() {
  const [activeView, setActiveView] = useState("read");
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      content:
        "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to create your first component...",
      author: "John Doe",
      date: "2024-06-05",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      content:
        "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Let's dive into when to use each one...",
      author: "Jane Smith",
      date: "2024-06-03",
    },
  ]);

  const handlePublishBlog = () => {
    if (newBlog.title && newBlog.content) {
      const blog = {
        id: blogs.length + 1,
        title: newBlog.title,
        content: newBlog.content,
        author: "You",
        date: new Date().toISOString().split("T")[0],
      };
      setBlogs([blog, ...blogs]);
      setNewBlog({ title: "", content: "" });
      setActiveView("read");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900">
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
              <PenTool className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-white">Menu</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-white/10 transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="p-4 space-y-2">
            {/* Home Button */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none">
              <Home className="w-5 h-5" />
              <Link to="/" className="font-medium">
                Home
              </Link>
            </button>

            {/* Blog Menu */}
            <div>
              <button
                onClick={() => setBlogMenuOpen(!blogMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-purple-600/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Blog</span>
                </div>
                {blogMenuOpen ? (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                )}
              </button>

              {/* Blog Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  blogMenuOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-2 space-y-1">
                  <button
                    onClick={() => {
                      setActiveView("read");
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none ${
                      activeView === "read"
                        ? "bg-gradient-to-r from-purple-600 to-slate-600 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-purple-600/20"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">Read</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView("write");
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-purple-400 focus:outline-none ${
                      activeView === "write"
                        ? "bg-gradient-to-r from-purple-600 to-slate-600 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-purple-600/20"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Write</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Header */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="absolute left-5">
              <div className="hover:bg-black/20 shadow-xl p-1.5 rounded-full hover:ring-2 hover:ring-purple-400 focus:outline-none">
                <Menu
                  size={32}
                  onClick={toggleSidebar}
                  className="text-white max-md:hidden cursor-pointer"
                />
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center pl-2 space-x-3">
              <div className="w-8 md:ml-15 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MekaTones
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-purple-300 font-medium hover:text-white transition-colors py-2 px-4 hover:ring-2 hover:ring-purple-400 rounded-lg  focus:outline-none">
                <Home className="w-5 h-5 inline mr-2" />
                <Link to="/">Home</Link>
              </button>
              <button className="text-gray-300 hover:text-white transition-colors hover:ring-2 hover:ring-purple-400 rounded-lg py-2 px-4 focus:outline-none">
                <BookOpen className="w-5 h-5 inline mr-2" />
                Blogs
              </button>
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
                {showProfile && (
                  <div className="absolute right-0 top-12 bg-gradient-to-br from-purple-900/95 via-slate-800/95 to-purple-900/95 backdrop-blur-xl rounded-2xl p-4 w-56 shadow-2xl border border-purple-500/30">
                    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-purple-500/30">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">John Doe</h3>
                        <p className="text-sm text-slate-300">
                          john@example.com
                        </p>
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
                      <button className="w-full text-left px-3 py-2 hover:bg-purple-600/30 rounded-xl transition-all duration-200 text-sm text-white hover:ring-2 hover:ring-purple-400 focus:outline-none">
                        Login
                      </button>
                      <hr className="border-purple-500/30 my-2" />
                      <button className="w-full text-left px-3 py-2 hover:bg-red-600/30 rounded-xl transition-all duration-200 text-sm text-red-400 hover:ring-2 hover:ring-red-400 focus:outline-none">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
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

          {/* Mobile Menu */}
          {showMobileMenu && (
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
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <Home className="w-5 h-5" />
                    <Link to="/">Home</Link>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Blogs</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:ring-2 hover:ring-purple-400 focus:outline-none transition-all duration-200"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors hover:ring-2 hover:ring-purple-400 focus:outline-none"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeView === "read" ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{blog.content}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              Write New Post
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  placeholder="Enter blog title..."
                  className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 backdrop-blur-sm hover:ring-2 hover:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Content
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  placeholder="Write your blog content here..."
                  rows={12}
                  className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 backdrop-blur-sm resize-none hover:ring-2 hover:ring-purple-400"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePublishBlog}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
                >
                  <Save className="w-4 h-4" />
                  Publish
                </button>

                <button
                  onClick={() => {
                    setNewBlog({ title: "", content: "" });
                    setActiveView("read");
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-slate-500/20 hover:from-purple-500/30 hover:to-slate-500/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm hover:ring-2 hover:ring-purple-400 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
