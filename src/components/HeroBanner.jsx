import banner from "../assets/images/banner.png";

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-20 md:py-0 md:min-h-screen">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <span className="inline-block text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Fitness Club
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Sweat, Smile <br />
            <span className="text-orange-500">And Repeat</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Discover over 1,300 exercises tailored to your goals. Build
            strength, burn fat, and stay consistent.
          </p>

          <a
            href="#exercises"
            className="inline-block bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                       text-white font-semibold text-sm tracking-wide
                       px-8 py-4 rounded-xl transition-colors duration-200 shadow-md"
          >
            Explore Exercises →
          </a>

          {/* Stats */}
          <div className="flex gap-8 justify-center md:justify-start pt-4">
            {[
              { value: "1,300+", label: "Exercises" },
              { value: "30+", label: "Muscle Groups" },
              { value: "100%", label: "Free" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Banner Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative circle */}
            <div className="absolute inset-0 bg-orange-100 rounded-full scale-90 blur-2xl opacity-60" />
            <img
              src={banner}
              alt="Fitness Banner"
              className="relative w-64 sm:w-80 md:w-96 lg:w-[480px] object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
