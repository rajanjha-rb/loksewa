import { LogoutBtn, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status ?? false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", status: true, isButton: false },
    {
      name: "Login",
      slug: "/login",
      status: !authStatus,
      isButton: true,
      color: "blue",
    },
    {
      name: "Signup",
      slug: "/signup",
      status: !authStatus,
      isButton: true,
      color: "green",
    },
  ];

  return (
    <header className="bg-gray-900 text-gray-100 border-b border-gray-700 sticky top-0 z-50 shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4 md:py-5">
          {/* Logo with extra left padding */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300 pl-2"
            aria-label="Loksewa Academy Home"
          >
            <img
              src="/logo.png"
              alt="Loksewa Academy Logo"
              className="h-8 w-auto"
            />
            <span className="hidden md:inline-block text-2xl font-extrabold tracking-wide select-none">
              Loksewa Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-semibold mr-4">
            {navItems.map(
              (item) =>
                item.status && (
                  <li key={item.name}>
                    {item.isButton ? (
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`
                          px-5 py-2 rounded-md font-semibold text-white transition
                          ${
                            item.color === "blue"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-green-600 hover:bg-green-700"
                          }
                          ${item.name === "Signup" ? "pr-4" : ""}
                        `}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(item.slug)}
                        className="relative group px-2 py-1 text-gray-200 hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.name}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-400 rounded mt-1" />
                      </button>
                    )}
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-gray-100 hover:text-blue-400 transition-colors duration-200 pr-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900 text-gray-100 border-t border-gray-700 overflow-hidden"
            >
              <ul className="flex flex-col gap-4 px-4 py-4 text-base font-semibold">
                {navItems.map(
                  (item) =>
                    item.status && (
                      <li key={item.name}>
                        {item.isButton ? (
                          <button
                            onClick={() => {
                              navigate(item.slug);
                              setMenuOpen(false);
                            }}
                            className={`w-full px-4 py-3 rounded-md font-semibold text-white transition
                              ${
                                item.color === "blue"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-green-600 hover:bg-green-700"
                              }`}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              navigate(item.slug);
                              setMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition"
                          >
                            {item.name}
                          </button>
                        )}
                      </li>
                    )
                )}
                {authStatus && (
                  <li>
                    <div className="px-4">
                      <LogoutBtn />
                    </div>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Header;
