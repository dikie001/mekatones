export function BlogList({ blogs }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
      {blogs.map((blog) => (
        <article
          key={blog.id}
          className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
          <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
            <span>By {blog.author}</span>
            <span>{blog.date}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{blog.content}</p>
        </article>
      ))}
    </div>
  );
}
