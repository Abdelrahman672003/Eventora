import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { logo5 } from "../../assets";
import { useNavigate } from "react-router-dom";

const LoginTemplate = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="relative hidden md:flex flex-col justify-center items-center w-2/5 bg-gray-900 text-white px-10 rounded-tr-2xl rounded-br-2xl">
        <ChevronLeft
          className="absolute top-10 left-8 cursor-pointer w-6 h-6"
          onClick={() => navigate("/")}
        />
        <img src={logo5} alt="Eventify Logo" className="h-28" />
        <p className="text-xl font-semibold mt-4 mb-2 leading-tight">
          Welcome back.
        </p>
        <p className="text-lg">Log in to explore your favorite events again!</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white rounded-t-3xl md:rounded-none">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-primary transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
