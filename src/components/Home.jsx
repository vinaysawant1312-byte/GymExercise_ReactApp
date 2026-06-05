import { useState } from "react";
import Exercises from "./Exercises";
import HeroBanner from "./HeroBanner";
import SearchExercises from "./SearchExercises";

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
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </>
  );
};

export default Home;
