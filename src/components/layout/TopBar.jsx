import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Sales", path: "/sales" },
  { name: "Marketing", path: "/marketing" },
  { name: "Visual Media", path: "/visual-media" },
  { name: "IT Developer", path: "/it-developer" },
  { name: "Accounts", path: "/accounts" },
  { name: "HRM", path: "/hrm" },
  { name: "Admin", path: "/admin" },
];

const TopBar = ({ mode = "view" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[var(--color-bg)]">
      
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink to="/dashboard" onClick={closeMenu}>
          <h1 className="text-xl italic tracking-[0.08em] sm:text-2xl">
            CC MEDIA
          </h1>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <div className="flex items-center gap-x-4">

            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative text-sm ${
                  isActive ? "text-black" : "text-gray-400 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Dashboard
                  <span
                    className={`absolute left-0 -bottom-1 h-[1px] bg-black transition-all ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>

            {/* Brands Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="text-sm text-gray-400 hover:text-black"
              >
                Brands
              </button>

              {openDropdown && (
                <div className="absolute left-0 top-full mt-1 min-w-[200px] border border-gray-200 bg-white z-50">
                  
                  <NavLink
                    to="/brands"
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Overview
                  </NavLink>

                  <NavLink
                    to="/brands/tcs"
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    TCS
                  </NavLink>

                  <NavLink
                    to="/brands/tcmi"
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    TCMI
                  </NavLink>

                </div>
              )}
            </div>

            {/* Other Links */}
            {navItems.slice(1).map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm ${
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[1px] bg-black transition-all ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Status Badge */}
          <div className="hidden rounded-full border border-black/20 px-3 py-1 text-[10px] tracking-[0.12em] text-gray-500 md:block">
            ● {mode === "edit" ? "EDIT MODE" : "VIEW MODE"}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden border border-black/10 p-2 rounded-full"
          >
            {isMobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-black/10 px-4 py-4 lg:hidden">

          <div className="mb-4 text-xs tracking-[0.12em] text-gray-500">
            ● {mode === "edit" ? "EDIT MODE" : "VIEW MODE"}
          </div>

          <nav className="flex flex-col gap-3">

            <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>

            <NavLink to="/brands" onClick={closeMenu}>
              Brands
            </NavLink>

            <NavLink to="/brands/tcs" onClick={closeMenu}>
              TCS
            </NavLink>

            <NavLink to="/brands/tcmi" onClick={closeMenu}>
              TCMI
            </NavLink>

            {navItems.slice(1).map((item) => (
              <NavLink key={item.name} to={item.path} onClick={closeMenu}>
                {item.name}
              </NavLink>
            ))}

          </nav>
        </div>
      )}
    </header>
  );
};

export default TopBar;