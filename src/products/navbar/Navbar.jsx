import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import profile from "../../assets/noavatar.jpg";
import { useShowMeQuery } from "../../hooks/user/useShowMeQuery";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = useShowMeQuery();

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav>
      <div className="nav-bar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="logo" />
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
