import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { BlogList } from "../components/BlogList";
import { BlogEditor } from "../components/BlogEditor";

export default function BlogPage() {
  const [activeView, setActiveView] = useState("read");
  const [isOpen, setIsOpen] = useState(false);
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

  const handleCancelBlog = () => {
    setNewBlog({ title: "", content: "" });
    setActiveView("read");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <Header onSidebarToggle={toggleSidebar} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeView === "read" ? (
          <BlogList blogs={blogs} />
        ) : (
          <BlogEditor
            newBlog={newBlog}
            onBlogChange={setNewBlog}
            onPublish={handlePublishBlog}
            onCancel={handleCancelBlog}
          />
        )}
      </main>
    </div>
  );
}
