const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold">
            Fit<span className="text-orange-500">Forge</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">Build the body you want.</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-400">
          {["Home", "Exercises", "Muscles", "Equipment"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-orange-500 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} FitForge. All rights reserved.
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    </footer>
  );
};

export default Footer;
