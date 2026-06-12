import { useEffect, useState } from "react";
import { exerciseOption, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

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
    if (searchTerm) {
      // Fetch all exercises with pagination for searching
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
            if (pageData.length < pageSize) {
              hasMore = false;
            } else {
              offset += pageSize;
            }
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error("Error fetching exercises:", error);
          hasMore = false;
        }
      }

      const SearchExercises = allExercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm) ||
          exercise.target.toLowerCase().includes(searchTerm) ||
          exercise.equipment.toLowerCase().includes(searchTerm) ||
          exercise.bodyPart.toLowerCase().includes(searchTerm),
      );
      setSearchTerm("");
      setExercises(SearchExercises);
    }
  };
  return (
    <>
      <h1 className="text-center text-6xl py-20 mx-90 font-semibold i">
        Awesome Exercise You Should Know
      </h1>
      <div className="mt-6 flex  justify-center mx-80">
        <input
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          type="text"
          required
          placeholder="Search exercises..."
          autoComplete="email"
          className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2.5 text-base text-blackoutline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 sm:text-sm/6 border-2"
        />
        <button
          type="submit"
          className="flex-none  rounded-md bg-red-500 px-3.5 py-2.5  font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 text-2xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <HorizontalScrollBar
        data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </>
  );
};

export default SearchExercises;
