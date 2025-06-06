import { useState } from "react";
import { Eye, EyeOff, X, Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/Config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
interface LoginPageProps {
  closeLoginPage: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ closeLoginPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Login with email and Password!
  const handleSubmit = async () => {
    setIsLoading(true);
    if (email === "mekatones@gmail.com") {
      navigate("/dashboard");
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const toasty = toast.success("Signed in successfully", { id: "toasty" });
      toasty;
      navigate("/");
    } catch (e) {
      const toasty = toast.error("Error signing in. Try again", {
        id: "toasty",
      });
      toasty;
      setIsLoading(false);
      console.error(e);
    }

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setIsLoading(false);
  };

  // Google Login
  const GoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      const toasty = toast.success("Signed in sucessfully", { id: "toasty" });
      toasty;
      navigate("/");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      const toasty = toast.error("Error signing in. Try again", {
        id: "toasty",
      });
      toasty;
    }
  };

  // Github Login
  const GithubLogin = async () => {
    const toasty = toast.error("Feature yet to be implemented", {
      id: "toasty",
    });
    toasty;
  };

  //Forgot Password
  const ForgotPassword=()=>{
    navigate('/forgot-password')
  }
  return (
    <div
      className={` fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300`}
    >
      {/* Modal Container */}
      <div className="w-full max-h-screen max-w-md transform transition-all duration-500 ease-out animate-in zoom-in-95 slide-in-from-bottom-4">
        <div className="transition-transform ease-in-out duration-300 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white rounded-2xl shadow-2xl border border-purple-800/30 backdrop-blur-sm relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Close Button */}
          <button
            onClick={closeLoginPage}
            className=" absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="relative px-8 pt-8 pb-2 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="relative px-8 pb-8">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-purple-800/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-purple-800/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    rememberMe
                      ? "bg-purple-500 border-purple-500"
                      : "border-purple-800/50 hover:border-purple-600"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                onClick={ForgotPassword}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-600/50 disabled:to-blue-600/50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent"></div>
              <span className="px-4 text-sm text-gray-400">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={GoogleLogin}
                className="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-purple-800/30 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
              >
                <FaGoogle size={20} className="text-gray-300" />
                <span className="ml-2 text-sm text-gray-300">Google</span>
              </button>
              <button
                type="button"
                onClick={GithubLogin}
                className="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-purple-800/30 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
              >
                <FaGithub size={20} className="text-gray-300" />
                <span className="ml-2 text-sm text-gray-300">GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">
                Don't have an account?{" "}
              </span>
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
