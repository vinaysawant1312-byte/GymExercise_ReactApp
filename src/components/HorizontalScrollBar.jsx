import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BodyPart from "./BodyPart";

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart }) => {
  const scrollRef = useRef(null);
  const items = Array.isArray(data) ? data : [];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-2 w-full mt-50 ">
      <button onClick={scrollLeft} className="p-2 bg-gray-200 rounded ml-10">
        <ChevronLeft />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto w-full  ">
        {items.map((item) => (
          <div
            key={item.id || item}
            className="min-w-50 h-40 bg-white flex items-center justify-cente rounded-lg  "
            title={item.id || item}
          >
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          </div>
        ))}
      </div>

      <button onClick={scrollRight} className="p-2 bg-gray-200 rounded mr-10">
        <ChevronRight />
      </button>
    </div>
  );
};

export default HorizontalScrollBar;
