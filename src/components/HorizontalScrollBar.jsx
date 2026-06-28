import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BodyPart from "./BodyPart";
import ExerciseCard from "./ExersciseCard";

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {
  const scrollRef = useRef(null);
  const items = Array.isArray(data) ? data : [];

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="relative flex items-center gap-3 w-full py-4 mt-20">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="z-10 flex-shrink-0 p-2 md:p-3 bg-white border border-gray-200 
                   rounded-full shadow-md hover:bg-orange-500 hover:text-white 
                   hover:border-orange-500 transition-all duration-200 text-gray-600"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto w-full scroll-smooth
                   scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <div
            key={item.id || item}
            className={`flex-shrink-0 bg-white rounded-2xl shadow-sm 
                        border border-gray-100 hover:shadow-md hover:-translate-y-1 
                        transition-all duration-200 overflow-hidden
                        ${
                          isBodyParts
                            ? "w-36 h-36 md:w-44 md:h-44 flex items-center justify-center"
                            : "w-56 md:w-64"
                        }`}
          >
            {isBodyParts ? (
              <BodyPart
                item={item}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
              />
            ) : (
              <Link to={`/exercise-detail/${item.id}`}>
                <ExerciseCard exercise={item} />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="z-10 flex-shrink-0 p-2 md:p-3 bg-white border border-gray-200 
                   rounded-full shadow-md hover:bg-orange-500 hover:text-white 
                   hover:border-orange-500 transition-all duration-200 text-gray-600"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HorizontalScrollBar;
