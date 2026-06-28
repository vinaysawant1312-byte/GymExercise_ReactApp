import { useEffect, useState } from "react";
import { fetchData, exerciseOption } from "../utils/fetchData";

const ExerciseCard = ({ exercise }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    let objectUrl;

    const loadImage = async () => {
      try {
        const blob = await fetchData(
          `/api/image?exerciseId=${exercise.id}&resolution=180`,
          { ...exerciseOption, returnType: "blob" },
        );
        objectUrl = URL.createObjectURL(blob);
        if (mounted) setImageUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load exercise image:", err);
      }
    };
    loadImage();

    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [exercise.id]);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
                    hover:-translate-y-1 transition-all duration-300 
                    border-t-4 border-orange-500 w-full max-w-xs mx-auto"
    >
      {/* Image Area */}
      <div className="w-full h-48 md:h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span
            className="bg-red-100 text-red-600 text-xs font-semibold 
                           px-3 py-1 rounded-full capitalize"
          >
            {exercise.bodyPart}
          </span>
          <span
            className="bg-yellow-100 text-yellow-600 text-xs font-semibold 
                           px-3 py-1 rounded-full capitalize"
          >
            {exercise.target}
          </span>
        </div>

        {/* Exercise Name */}
        <h3
          className="text-sm md:text-base font-bold text-gray-800 capitalize
                       leading-snug line-clamp-2"
        >
          {exercise.name}
        </h3>

        {/* View Detail hint */}
        <p className="text-xs text-orange-500 font-medium tracking-wide">
          View Details →
        </p>
      </div>
    </div>
  );
};

export default ExerciseCard;
