import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Github, Chrome, ArrowRight, Check, AlertCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

type SocialProvider = 'Google' | 'GitHub';

export default function SignupPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: 1 | 2): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!acceptTerms) {
        newErrors.terms = 'Please accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = (): void => {
    setCurrentStep(1);
  };

  const handleSubmit = async (): Promise<void> => {
    if (validateStep(2)) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsLoading(false);
      alert('Account created successfully!');
    }
  };

  const handleSocialSignup = (provider: SocialProvider): void => {
    alert(`Sign up with ${provider} clicked`);
  };

  const getPasswordStrength = (): number => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  const getInputClassName = (hasError: boolean): string => {
    const baseClasses = "w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm";
    return hasError 
      ? `${baseClasses} border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50`
      : `${baseClasses} border-purple-800/30 focus:ring-purple-500/50 focus:border-purple-500/50`;
  };

  const getPasswordInputClassName = (hasError: boolean): string => {
    const baseClasses = "w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm";
    return hasError 
      ? `${baseClasses} border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50`
      : `${baseClasses} border-purple-800/30 focus:ring-purple-500/50 focus:border-purple-500/50`;
  };

  const getCheckboxClassName = (hasError: boolean): string => {
    const baseClasses = "w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center mt-0.5 flex-shrink-0";
    if (acceptTerms) return `${baseClasses} bg-purple-500 border-purple-500`;
    if (hasError) return `${baseClasses} border-red-500/50`;
    return `${baseClasses} border-purple-800/50 hover:border-purple-600`;
  };

  return (
    <div className='fixed z-55 w-full h-screen overflow-auto'>
      <div className=" bg-slate-950 relative overflow-auto z-55">
        {/* Animated Background */}
        <div className="absolute inset-0 max-h-screen">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen ">
          {/* Left Side - Welcome Section (Hidden on mobile) */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <User size={32} className="text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                Join Our Community
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create your account and unlock access to exclusive features,
                personalized content, and a world of possibilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Check
                    size={20}
                    className="text-green-400 mr-3 flex-shrink-0"
                  />
                  <span>Free forever with premium features</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Check
                    size={20}
                    className="text-green-400 mr-3 flex-shrink-0"
                  />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Check
                    size={20}
                    className="text-green-400 mr-3 flex-shrink-0"
                  />
                  <span>Advanced security & privacy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-md">
              <div className="transition-transform ease-in-out duration-300 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white rounded-2xl shadow-2xl border border-purple-800/30 backdrop-blur-sm overflow-hidden">
                {/* Progress Indicator */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">
                      Step {currentStep} of 2
                    </span>
                    <span className="text-sm text-gray-400">
                      {currentStep === 1 ? "Personal Info" : "Security"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(currentStep / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Header */}
                <div className="px-6 pb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    {currentStep === 1
                      ? "Create Account"
                      : "Secure Your Account"}
                  </h2>
                  <p className="text-gray-400 mt-2">
                    {currentStep === 1
                      ? "Enter your personal information"
                      : "Set up your password and preferences"}
                  </p>
                </div>

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="px-6 pb-6 space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className={getInputClassName(!!errors.firstName)}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-400 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className={getInputClassName(!!errors.lastName)}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-400 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={getInputClassName(!!errors.email)}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={getInputClassName(!!errors.phone)}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center"
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <div className="px-6 pb-6 space-y-6">
                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className={getPasswordInputClassName(
                            !!errors.password
                          )}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-400">
                              Password strength
                            </span>
                            <span
                              className={`font-medium ${
                                getPasswordStrength() <= 1
                                  ? "text-red-400"
                                  : getPasswordStrength() <= 2
                                  ? "text-yellow-400"
                                  : getPasswordStrength() <= 3
                                  ? "text-blue-400"
                                  : "text-green-400"
                              }`}
                            >
                              {getStrengthText(getPasswordStrength())}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                                getPasswordStrength()
                              )}`}
                              style={{
                                width: `${(getPasswordStrength() / 4) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={getPasswordInputClassName(
                            !!errors.confirmPassword
                          )}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={getCheckboxClassName(!!errors.terms)}>
                          {acceptTerms && (
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
                        <span className="ml-3 text-sm text-gray-300 leading-relaxed">
                          I agree to the{" "}
                          <button className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200">
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200">
                            Privacy Policy
                          </button>
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-purple-800/30 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-2 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-600/50 disabled:to-blue-600/50 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Creating...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Signup (Only on Step 1) */}
                {currentStep === 1 && (
                  <div className="px-6 pb-6">
                    {/* Divider */}
                    <div className="my-6 flex items-center">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent"></div>
                      <span className="px-4 text-sm text-gray-400">
                        or sign up with
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSocialSignup("Google")}
                        className="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-purple-800/30 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
                      >
                        <Chrome size={18} className="text-gray-300" />
                        <span className="ml-2 text-sm text-gray-300">
                          Google
                        </span>
                      </button>
                      <button
                        onClick={() => handleSocialSignup("GitHub")}
                        className="flex items-center justify-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-purple-800/30 rounded-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
                      >
                        <Github size={18} className="text-gray-300" />
                        <span className="ml-2 text-sm text-gray-300">
                          GitHub
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Login Link */}
                <div className="px-6 pb-6 text-center">
                  <span className="text-gray-400 text-sm">
                    Already have an account?{" "}
                  </span>
                  <button className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-200">
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}