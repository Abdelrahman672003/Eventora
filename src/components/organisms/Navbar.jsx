import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../atoms/ThemeToggle";
import { logo5, logo6 } from "../../assets";
import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Button from "../atoms/Button";
import { use, useEffect, useState } from "react";
import { useAuthService } from "../../api/services";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthService();
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      closeButton: false,
    });
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-background dark:bg-primary text-white px-4 md:px-10 flex justify-between items-center shadow-lg fixed top-4 z-100 w-[90%] md:w-[96%] rounded-xl mx-[5%] md:mx-[2%]">
        <img
          src={logo6}
          alt="Eventora Logo"
          className="h-13 block dark:hidden my-2"
          onClick={() => navigate("/")}
        />
        <img
          src={logo5}
          alt="Eventora Logo"
          className="h-13 hidden dark:block my-2"
          onClick={() => navigate("/")}
        />

        <div className="items-center gap-10 text-primary font-semibold dark:text-white h-full md:flex hidden">
          {JSON.parse(localStorage.getItem("user"))?.role == "admin" && (
            <Link
              to="/dashboard"
              className={
                location?.pathname.includes("/dashboard")
                  ? "active-nav px-1"
                  : "px-1"
              }
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/"
            className={location?.pathname == "/" ? "active-nav px-1" : "px-1"}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={
              location?.pathname.includes("/events")
                ? "active-nav px-1"
                : "px-1"
            }
          >
            Events
          </Link>
          <Link
            to="/about"
            className={
              location?.pathname == "/about" ? "active-nav px-1" : "px-1"
            }
          >
            About
          </Link>
          <Link
            to="/contact"
            className={
              location?.pathname == "/contact" ? "active-nav px-1" : "px-1"
            }
          >
            Contact
          </Link>
          {localStorage.getItem("user") && (
            <Link
              to="/profile"
              className={
                location?.pathname.includes("/profile")
                  ? "active-nav px-1"
                  : "px-1"
              }
            >
              My Bookings
            </Link>
          )}
        </div>

        <div className="flex items-center my-2">
          <button
            onClick={handleMobileMenuClick}
            className="p-2 cursor-pointer block md:hidden"
          >
            {isDark ? (
              <Menu className="text-white" />
            ) : (
              <Menu className="text-primary" />
            )}
          </button>

          {JSON.parse(localStorage.getItem("user"))?.role == "admin" ? (
            <span
              className="flex items-center"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="text-primary block dark:hidden cursor-pointer mr-2" />
              <LayoutDashboard className="text-white hidden dark:block cursor-pointer mr-2" />
            </span>
          ) : JSON.parse(localStorage.getItem("user"))?.role == "user" ? (
            <span
              className="flex items-center"
              onClick={() => navigate("/profile")}
            >
              <CircleUserRound
                className={"text-primary block dark:hidden cursor-pointer mr-2"}
              />
              <CircleUserRound
                className={"text-white hidden dark:block cursor-pointer mr-2"}
              />
            </span>
          ) : (
            ""
          )}

          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

          {localStorage.getItem("user") ? (
            <>
              <LogOut
                onClick={handleLogout}
                className="text-primary block dark:hidden cursor-pointer"
              />
              <LogOut
                onClick={handleLogout}
                className="text-white hidden dark:block cursor-pointer"
              />
            </>
          ) : (
            <Button
              className="bg-secondary text-primary ml-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      <div
        style={{ transition: "0.3s ease" }}
        className={`fixed bg-[#00000050] inset-0 z-150 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 hidden"
        }`}
        onClick={handleMobileMenuClick}
      >
        <div
          style={{ transition: "0.3s ease" }}
          className={`fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-primary dark:text-white">
              Menu
            </h2>
            <button onClick={handleMobileMenuClick}>
              <X className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <button
              onClick={() => handleNavigation("/")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                location?.pathname === "/"
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/events")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                location?.pathname.includes("/events")
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                location?.pathname === "/about"
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              About
            </button>
            {JSON.parse(localStorage.getItem("user"))?.role == "user" && (
              <button
                onClick={() => handleNavigation("/profile")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  location?.pathname === "/profile"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                My Tickets
              </button>
            )}
            <button
              onClick={() => handleNavigation("/contact")}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                location?.pathname === "/contact"
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
