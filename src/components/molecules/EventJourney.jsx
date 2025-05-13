import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventJourneySection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-secondary text-black py-10 px-6 md:px-12 rounded-xl relative overflow-hidden shadow-md max-w-[1200px] mx-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to Start Your Event Journey?
          </h2>
          <p className="text-sm md:text-base max-w-xl">
            Join thousands of event enthusiasts and discover amazing experiences
            in your city.
          </p>
        </div>

        <button
          onClick={() => navigate("/contact")}
          className="text-primary flex items-center gap-2 border-2 border-primary px-5 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition cursor-pointer"
        >
          <User size={18} />
          Get Started Now
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default EventJourneySection;
