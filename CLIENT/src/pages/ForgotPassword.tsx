import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-slate-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 text-purple-300" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Check Your Email
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                We've sent a password reset link to{" "}
                <span className="text-purple-300 font-medium">{email}</span>.
                Click the link in the email to reset your password.
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleResendEmail}
                  className="w-full bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:scale-103 shadow-lg"
                >
                  Send Another Emails
                </button>

                <Link
                  to="/auth-page"
                  className="w-full bg-gradient-to-r from-purple-500/20 to-slate-500/20 hover:from-purple-500/30 hover:to-slate-500/30 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-purple-400/30 flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/auth-page"
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-purple-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-purple-800/20 via-slate-700/20 to-purple-800/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/30">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-slate-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-purple-300" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">
              Forgot Password?
            </h1>

            <p className="text-slate-300 leading-relaxed">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-gradient-to-r from-purple-500/10 to-slate-500/10 border border-purple-400/30 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm"
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mb-5 bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-103 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5  border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Reset Link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Need help? Contact our{" "}
          <a
            href="#"
            className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
          >
            support team
          </a>
        </p>
      </div>
    </div>
  );
}
