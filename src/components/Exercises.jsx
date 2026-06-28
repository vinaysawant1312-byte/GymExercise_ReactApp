import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { exerciseOption, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExersciseCard";
import Pagination from "./Pagination";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchExercisesData = async () => {
      setLoading(true);
      let allExerciseData = [];
      let offset = 0;
      const pageSize = 10;
      let hasMore = true;

      while (hasMore) {
        let pageData = [];
        try {
          if (bodyPart === "all") {
            pageData = await fetchData(
              `/api/exercises?offset=${offset}`,
              exerciseOption,
            );
          } else {
            pageData = await fetchData(
              `/api/exercises/bodyPart/${bodyPart}?offset=${offset}`,
              exerciseOption,
            );
          }

          if (pageData && pageData.length > 0) {
            allExerciseData = [...allExerciseData, ...pageData];
            if (pageData.length < pageSize) hasMore = false;
            else offset += pageSize;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error("Error fetching exercises:", error);
          hasMore = false;
        }
      }

      setExercises(allExerciseData);
      setLoading(false);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExercises = exercises.slice(indexOfFirst, indexOfLast);

  return (
    <section
      id="exercises"
      className="scroll-smooth px-4 md:px-10 py-10 max-w-screen-xl mx-auto"
    >
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Showing <span className="text-orange-500">Results</span>
        </h2>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl h-72 animate-pulse"
            />
          ))}
        </div>
      ) : currentExercises.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-5xl mb-4">🏋️</p>
          <p className="text-gray-500 text-lg font-medium">
            No exercises found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try selecting a different body part
          </p>
        </div>
      ) : (
        /* Exercise Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentExercises.map((exercise) => (
            <Link
              to={`/exercise-detail/${exercise.id}`}
              key={exercise.id}
              className="group"
            >
              <ExerciseCard exercise={exercise} />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && exercises.length > itemsPerPage && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalExercises={exercises.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </section>
  );
};

export default Exercises;
