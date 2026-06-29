import gym from "../assets/icons/gym.png";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const isActive = bodyPart === item;

  return (
    <div
      onClick={() => setBodyPart(item)}
      className={`flex flex-col items-center justify-center gap-3 px-6 py-5 rounded-2xl cursor-pointer
                  w-36 transition-all duration-200 select-none
                  ${
                    isActive
                      ? "bg-orange-500 shadow-lg shadow-orange-200 scale-105"
                      : "bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md hover:scale-105"
                  }`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center
                    ${isActive ? "bg-white/20" : "bg-orange-50"}`}
      >
        <img src={gym} alt={item} className="w-8 h-8 object-contain" />
      </div>

      <p
        className={`text-sm font-semibold capitalize text-center leading-tight
                    ${isActive ? "text-white" : "text-gray-700"}`}
      >
        {item}
      </p>

      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
      )}
    </div>
  );
};

export default BodyPart;
