import gym from "../assets/icons/gym.png";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg cursor-pointer w-40
    transition-transform hover:scale-105 hover:shadow-lg
    ${bodyPart === item ? " bg-red-100 scale-105" : ""}`}
      onClick={() => setBodyPart(item)}
    >
      <img src={gym} alt="Gym" className="w-12 h-12 object-contain" />

      <div className="text-center font-medium text-gray-800 mt-8 text-[20px]">
        {item}
      </div>
    </div>
  );
};

export default BodyPart;
