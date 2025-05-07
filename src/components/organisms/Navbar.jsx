import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../atoms/ThemeToggle";
import { logo5, logo6 } from "../../assets";
import { CircleUserRound, Menu } from "lucide-react";
import Button from "../atoms/Button";
import { use } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bg-background dark:bg-primary text-white px-4 md:px-10 flex justify-between items-center shadow-lg fixed top-4 z-100 w-[90%] md:w-[96%] rounded-xl mx-[5%] md:mx-[2%]">
      <img
        src={logo6}
        alt="Eventora Logo"
        className="h-13 block dark:hidden my-2"
      />
      <img
        src={logo5}
        alt="Eventora Logo"
        className="h-13 hidden dark:block my-2"
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
          <Menu />
        </button>
        <ThemeToggle />

        {false ? (
          <>
            <CircleUserRound className={"text-primary block dark:hidden"} />
            <CircleUserRound className={"text-white hidden dark:block"} />
          </>
        ) : (
          <Button className="bg-secondary text-primary" onClick={() => navigate("/login")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
