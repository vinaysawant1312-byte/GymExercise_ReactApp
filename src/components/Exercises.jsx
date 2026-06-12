import { useEffect } from "react";
import { exerciseOption, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExersciseCard";
import BodyPart from "./BodyPart";
const Exercises = ({ exercises, setExercises, bodyPart }) => {
  useEffect(() => {
    const fetchExercisesData = async () => {
      let allExerciseData = [];
      let offset = 0;
      const pageSize = 10;
      let hasMore = true;

      // Fetch all pages until we get less than 10 items (meaning end of results)
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
            // If we got less than 10 items, we've reached the end
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

      setExercises(allExerciseData);
    };
    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    <>
      <div> value</div>
      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Exercises;
