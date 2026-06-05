import banner from "../assets/images/banner.png";
const HeroBanner = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className=" py-60 px-10 ">
          <h3 className="text-red-600  text-3xl pb-7">Fitness club </h3>
          <h1 className="text-6xl pb-5">Sweat, Smile And Repeat</h1>
          <p className="pb-7">Check out the nost effective exercises</p>
          <button className=" bg-red-600 p-2 text-white ">
            EXPLORE EXERCISES
          </button>
        </div>
        <div className=" w-230">
          <img src={banner} className="w-full" />
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
