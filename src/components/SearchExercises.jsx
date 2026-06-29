import { useEffect, useState } from "react";
import { exerciseOption, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData(
        `/api/exercises/bodyPartList`,
        exerciseOption,
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExerciseData();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    let allExercisesData = [];
    let offset = 0;
    const pageSize = 10;
    let hasMore = true;

    while (hasMore) {
      try {
        const pageData = await fetchData(
          `/api/exercises?offset=${offset}`,
          exerciseOption,
        );
        if (pageData && pageData.length > 0) {
          allExercisesData = [...allExercisesData, ...pageData];
          hasMore = pageData.length >= pageSize;
          offset += pageSize;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        hasMore = false;
      }
    }

    const filtered = allExercisesData.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.target.toLowerCase().includes(searchTerm) ||
        exercise.equipment.toLowerCase().includes(searchTerm) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm),
    );

    setSearchTerm("");
    setExercises(filtered);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full">
      {/* Hero heading */}
      <div className="text-center py-16 px-4">
        <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-3">
          Your Fitness Guide
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Awesome Exercises You <br className="hidden sm:block" />
          <span className="text-orange-500">Should Know</span>
        </h1>
        <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Search over 1,300 exercises by name, muscle, or equipment.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex items-center max-w-2xl mx-auto px-4 gap-0 shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white">
        <span className="pl-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <input
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search by name, muscle, or equipment..."
          className="flex-1 px-4 py-4 text-sm text-gray-800 placeholder:text-gray-400
                     bg-transparent outline-none border-none focus:ring-0"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                     text-white font-semibold text-sm px-6 py-4
                     transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                     whitespace-nowrap"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Body part scroll */}
      <div className="mt-10">
        <HorizontalScrollBar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </div>
    </section>
  );
};

export default SearchExercises;
