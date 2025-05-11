import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PremiumLoginSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary text-black py-10 px-6 md:px-12 rounded-xl relative overflow-hidden shadow-md max-w-[1200px] mx-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Login or Signup for a Premium Experience!
          </h2>
          <p className="text-sm md:text-base max-w-xl">
            Unlock personalized event recommendations, save your favorite
            artists, and enjoy a tailored event feed built just for you.
          </p>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="text-primary flex items-center gap-2 border-2 border-primary px-5 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition cursor-pointer"
        >
          <User size={18} />
          Login / Signup
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default PremiumLoginSection;
