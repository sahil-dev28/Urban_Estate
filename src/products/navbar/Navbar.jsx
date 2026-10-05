import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import profile from "../../assets/noavatar.jpg";
import { useShowMeQuery } from "../../hooks/user/useShowMeQuery";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import ThemeToggle from "../../components/common/ThemeToggle";
import CommandPalette, {
  shortcutLabel,
} from "../../components/common/CommandPalette";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const { data } = useShowMeQuery();

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const openPalette = () => {
    closeMenu();
    setPaletteOpen(true);
  };

  const searchButton = (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open search"
      className="search-trigger"
    >
      <Search size={16} />
      <span className="search-trigger-text">Search…</span>
      <kbd>{shortcutLabel}</kbd>
    </button>
  );

  return (
    <nav>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <div className="nav-bar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} className="brand-logo" alt="logo" />
          <span>UrbanEstate</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <div className="left">
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to="/property"
            end
            className={navLinkClass}
            onClick={closeMenu}
          >
            Properties
          </NavLink>
          {isLoggedIn && role === "landlord" && (
            <NavLink
              to="/property/my"
              className={navLinkClass}
              onClick={closeMenu}
            >
              My Properties
            </NavLink>
          )}
          {isLoggedIn && role === "tenant" && (
            <NavLink
              to="/application"
              className={navLinkClass}
              onClick={closeMenu}
            >
              My Applications
            </NavLink>
          )}
        </div>
        {isLoggedIn ? (
          <div className="right">
            {searchButton}
            <ThemeToggle />
            <div className="user">
              <img src={data?.profileImage || profile} alt={data?.name} />
              <span className="user-info">{data?.name}</span>
            </div>
            <Link to="/profile" className="profile-link" onClick={closeMenu}>
              Profile
            </Link>
          </div>
        ) : (
          <div className="right">
            {searchButton}
            <ThemeToggle />
            <Link to="/auth/login" className="login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/auth/register" className="register" onClick={closeMenu}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
