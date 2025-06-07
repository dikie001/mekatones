import { useState } from "react";
import {
  PlayCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Music,
  Headphones,
  Mic,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Left Side - Branding */}
        <div className="flex-1 max-w-md text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <PlayCircle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MekaTones
            </h1>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {isLogin ? "Welcome Back!" : "Join the Music Revolution"}
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            {isLogin
              ? "Sign in to share your music with the world"
              : "Create your account and start sharing your amazing tracks"}
          </p>

          {/* Feature Icons */}
          <div className="hidden lg:flex items-center justify-start space-x-8 text-gray-400">
            <div className="flex flex-col items-center space-y-2">
              <Music className="w-8 h-8 text-purple-400" />
              <span className="text-sm">Share Music</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Headphones className="w-8 h-8 text-pink-400" />
              <span className="text-sm">Discover Tracks</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Mic className="w-8 h-8 text-blue-400" />
              <span className="text-sm">Connect Artists</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Toggle Buttons */}
            <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  isLogin
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  !isLogin
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name Field (Sign Up Only) */}
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    <Link to="/forgot-password">Forgot password?</Link>
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Terms (Sign Up Only) */}
              {!isLogin && (
                <p className="text-sm text-gray-400 text-center">
                  By signing up, you agree to our{" "}
                  <button className="text-purple-400 hover:text-purple-300">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </button>
                </p>
              )}
            </div>

            {/* Social Login Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">
                or continue with
              </span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl transition-all">
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">G</span>
                </div>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl transition-all">
                <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          {/* Bottom Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
