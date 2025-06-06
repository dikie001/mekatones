import { LogIn, User, UserPlus, X } from "lucide-react";
import {Link} from 'react-router-dom'

interface LoginModalProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  closeModal: () => void;
  isVisible?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onLoginClick,
  onSignupClick,
  closeModal,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <div className=" fixed md:top-5 md:right-5 z-100 w-80 max-w-sm">
      <div className="  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white rounded-lg shadow-xl shadow-black/30 backdrop-blur-sm">
        <button
          onClick={closeModal}
          className="hover:rotate-90 transition-transform duration-300 absolute top-4 right-4 p-2 text-gray-400 hover:text-white  hover:bg-white/10 rounded-full z-10"
        >
          <X size={20} />
        </button>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-slate-300 text-sm">
              Sign in to your account or create a new one
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onLoginClick}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 
                         text-white font-medium py-3 px-4 rounded-lg 
                         transition-all duration-200 ease-in-out
                         flex items-center justify-center gap-2
                         focus:outline-none focus:ring-2 focus:ring-purple-400 
                         hover:shadow-lg hover:shadow-purple-600/25"
              type="button"
              aria-label="Sign in to your account"
            >
              <LogIn size={18} />
              Sign In
            </button>

            <button
              onClick={onSignupClick}
              className="w-full bg-slate-700 hover:bg-slate-600 active:bg-slate-800
                         text-white font-medium py-3 px-4 rounded-lg
                         transition-all duration-200 ease-in-out
                         flex items-center justify-center gap-2
                         outline-0
                         focus:outline-none focus:ring-2 focus:ring-slate-500  
                         "
              type="button"
              aria-label="Create a new account"
            >
              <UserPlus size={18} />
              Create Account
            </button>
            <Link
              to="/dashboard"
              className="text-white flex  justify-center bg-blue-500 w-full px-4 py-2 rounded"
            >
             <User/> admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
