import MusicAdminDashboard from "./pages/Dashboard"
import LandingPage from "./pages/Home"
import './scrollbar.css'
import {Toaster} from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CheckCircle, XCircle } from "lucide-react"
import ForgotPasswordPage from "./pages/ForgotPassword"
import AudioUploader from "./utils/cloudinary"
import Library from "./pages/Library"
import AuthPage from "./pages/Auth"
import BlogPage from "./pages/BlogPage"


const App = () => {
  return (
    <Router>
      {/* <AudioUploader /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Base style
          style: {
            borderRadius: "12px",
            padding: "14px 20px",
            fontWeight: 550,
            fontSize: "15px",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
          },
          // Success toast style
          success: {
            icon: <CheckCircle />,
            style: {
              background: "linear-gradient(to right, #a855f7, #6366f1)", // bright purple-indigo
              color: "#fff",
            },
          },
          // Error toast style
          error: {
            icon: <XCircle />,
            style: {
              background: "linear-gradient(to right, #ef4444, #1e293b)", // red-slate combo
              color: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<MusicAdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/auth-page" element={<AuthPage />} />
        <Route path="/blog-page" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App