import Logo from "../assets/images/Logo.png";
const Navbar = () => {
  return (
    <>
      <div className="flex items-center bg-amber-200 px-6 py-4 md:px-20">
        <div className="shrink-0">
          <img src={Logo} alt="Logo" className="h-16 w-16 md:h-20 md:w-20" />
        </div>

        <div className="flex-1">
          <div className="flex justify-start gap-9 text-2xl md:ml-10 px-10">
            <a
              href="/"
              className="text-gray-800 underline decoration-red-500 transition-colors duration-200 hover:text-gray-500"
            >
              Home
            </a>
            <a
              href="/exercises"
              className="text-gray-800  underline decoration-red-500 transition-colors duration-200 hover:text-gray-500"
            >
              Exercises
            </a>
          </div>
        </div>

        <div className="hidden w-16 md:block" />
      </div>
    </>
  );
};

export default Navbar;
