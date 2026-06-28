import HorizontalScrollBar from "./HorizontalScrollBar";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <div className="px-4 md:px-10 py-10 max-w-screen-xl mx-auto">
      {/* Section 1 */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Similar <span className="text-orange-500">Muscle Group</span>{" "}
            Exercises
          </h2>
        </div>
        <HorizontalScrollBar data={targetMuscleExercises} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-12" />

      {/* Section 2 */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Similar <span className="text-orange-500">Equipment</span> Exercises
          </h2>
        </div>
        <HorizontalScrollBar data={equipmentExercises} />
      </div>
    </div>
  );
};

export default SimilarExercises;
