import React, { useState } from "react";
import { PenTool, Plus, Save, X } from "lucide-react";

export default function BlogPage() {
  const [activeView, setActiveView] = useState("read"); // "read" or "write"
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });

  // Sample blog data
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800/30 to-slate-700/30 backdrop-blur-xl border-b border-purple-500/30">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-slate-500 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">My Blog</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView("read")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === "read"
                    ? "bg-gradient-to-r from-purple-600 to-slate-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Read
              </button>
              <button
                onClick={() => setActiveView("write")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeView === "write"
                    ? "bg-gradient-to-r from-purple-600 to-slate-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Plus className="w-4 h-4" />
                Write
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeView === "read" ? (
          // Blog List View
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
          // Write Blog View
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
                  className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm"
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
                  className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handlePublishBlog}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Publish
                </button>

                <button
                  onClick={() => {
                    setNewBlog({ title: "", content: "" });
                    setActiveView("read");
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-slate-500/20 hover:from-purple-500/30 hover:to-slate-500/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-purple-400/30 backdrop-blur-sm"
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
