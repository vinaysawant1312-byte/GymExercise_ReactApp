import Logo from "../assets/images/Logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/bmi", label: "BMI Calculator" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={Logo}
            alt="FitForge Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold text-gray-900 hidden sm:block">
            Fit<span className="text-orange-500">Forge</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {links.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${
                              isActive
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                            }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
