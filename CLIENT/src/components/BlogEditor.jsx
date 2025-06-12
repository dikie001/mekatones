import { Save, X } from "lucide-react";

export function BlogEditor({ newBlog, onBlogChange, onPublish, onCancel }) {
  return (
    <div className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/30">
      <h2 className="text-2xl font-bold text-white mb-6">Write New Post</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Title
          </label>
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) =>
              onBlogChange({ ...newBlog, title: e.target.value })
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
              onBlogChange({ ...newBlog, content: e.target.value })
            }
            placeholder="Write your blog content here..."
            rows={12}
            className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 backdrop-blur-sm resize-none hover:ring-2 hover:ring-purple-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onPublish}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <Save className="w-4 h-4" />
            Publish
          </button>

          <button
            onClick={onCancel}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-slate-500/20 hover:from-purple-500/30 hover:to-slate-500/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm hover:ring-2 hover:ring-purple-400 focus:outline-none"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
