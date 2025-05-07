import { videoBack } from "../../../assets";
import SearchBar from "../../atoms/SearchBar";

const HeroSection = ({
  title = "Discover and Book the Best Events Around You",
  eventsPage = false,
  video = videoBack,
}) => {
  return (
    <div className={`relative w-full min-h-[300px] overflow-hidden`}>
      {/* Background Video */}
      {!eventsPage ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute bottom-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        ""
      )}

      {/* Foreground Content */}
      <div
        className={`pt-40 px-10 md:px-20 py-16 relative z-10 flex flex-col items-center justify-center text-white text-center ${
          eventsPage
            ? "bg-gray-900"
            : "bg-[#000000aa]"
        } h-[${eventsPage ? "300px" : "500px"}]`}
      >
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
