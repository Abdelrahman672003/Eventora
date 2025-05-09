import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../atoms/ThemeToggle";
import { logo5, logo6 } from "../../assets";
import { CircleUserRound, LayoutDashboard, LogOut, Menu } from "lucide-react";
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
    toast.success("Logged out successfully");
  };

  return (
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
        <Link
          to="/"
          className={location?.pathname == "/" ? "active-nav px-1" : "px-1"}
        >
          Home
        </Link>
        <Link
          to="/events"
          className={
            location?.pathname.includes("/events") ? "active-nav px-1" : "px-1"
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
      </div>

      <div className="flex items-center my-2">
        <button
          onClick={() => setIsDark(!isDark)}
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
            <span className="text-primary dark:text-white cursor-pointer mr-2">
              {JSON.parse(localStorage.getItem("user"))?.name}
            </span>
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
            <span className="text-primary dark:text-white cursor-pointer mr-2">
              {JSON.parse(localStorage.getItem("user"))?.name}
            </span>
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
            className="bg-secondary text-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
