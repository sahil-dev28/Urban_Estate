import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import profile from "../../assets/noavatar.jpg";
import { useShowMeQuery } from "../../hooks/user/useShowMeQuery";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);

  const { data } = useShowMeQuery();
  console.log(data);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <span>UrbanEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/property">Properties</Link>
        {isLoggedIn && role === "landlord" && (
          <Link to="/property/my">My Properties</Link>
        )}
        {isLoggedIn && role === "tenant" && (
          <Link to="/application">My Applications</Link>
        )}
      </div>
      {isLoggedIn ? (
        <div className="right">
          <div className="user">
            <img src={profile} />
          </div>
          <span className="user-info">{data?.name}</span>
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
        </div>
      ) : (
        <div className="right">
          <Link to="/auth/login" className="login">
            Login
          </Link>
          <Link to="/auth/register" className="register">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
