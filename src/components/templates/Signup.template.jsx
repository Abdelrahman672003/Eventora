import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { logo1, logo5 } from "../../assets";
import { useNavigate } from "react-router-dom";

const SignupTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side */}
      <div className="relative hidden md:flex flex-col justify-center items-center w-2/5 bg-gray-900 text-white px-10 rounded-tr-2xl rounded-br-2xl">
        <img src={logo5} alt="" className="h-30" />
        <ChevronLeft
          className="absolute top-10 left-8 cursor-pointer w-6 h-6"
          onClick={() => navigate("/")}
        />
        <p className="text-xl font-semibold mt-4 mb-2 leading-tight">
          Discover tailored events.
        </p>
        <p className="text-lg">
          Sign up for personalized recommendations today!
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white rounded-t-3xl md:rounded-none">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <form className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 transition"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 transition"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 transition"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-400 transition"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
              >
                {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupTemplate;
