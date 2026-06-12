import { useState, useEffect } from "react";
import Exercises from "./Exercises";
import HeroBanner from "./HeroBanner";
import SearchExercises from "./SearchExercises";
import { fetchData, exerciseOption } from "../utils/fetchData";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <>
      <HeroBanner />

      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />

      <Exercises
        exercises={exercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        setExercises={setExercises}
      />
    </>
  );
};

export default Home;
