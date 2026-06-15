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
        console.log(blob);

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
    <div className="bg-white rounded-lg  hover:scale-105 transition-shadow mt-30 border-t-4 border-red-500">
      <div className="w-full h-70 rounded-md overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={exercise.name}
            className="w-70 h-70 object-cover"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-200 animate-pulse rounded-md" />
        )}
      </div>
      <div className="mt-3">
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ">
          {exercise.bodyPart}
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ml-2">
          {" "}
          {exercise.target}
        </button>
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {exercise.name}
        </h3>
      </div>
    </div>
  );
};

export default ExerciseCard;
