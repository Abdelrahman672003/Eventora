import { videoBack } from "../../../assets";
import { SearchBar } from "../../index";

const HeroSection = ({
  title = "Discover and Book the Best Events Around You",
  eventsPage = false,
  video = videoBack,
}) => {
  return (
    <div className={`relative w-full min-h-[300px] overflow-hidden`}>
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

      <div
        className={`pt-40 px-10 md:px-20 py-16 relative z-10 flex flex-col items-center justify-center text-white text-center bg-[#000000aa] h-[500px]`}
      >
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
