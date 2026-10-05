import bg from "./../assets/bg.png";
import "./Home.css";
import SearchBar from "./../auth/search-input/Search";
import { BadgeCheck, CalendarCheck, ClipboardList } from "lucide-react";
import { enterUp, stagger } from "../lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { DEMO_ACCOUNT } from "../utils/default";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified landlords",
    text: "Every listing comes from a registered landlord account.",
  },
  {
    icon: CalendarCheck,
    title: "Easy booking",
    text: "Apply for a property in one click, no paperwork.",
  },
  {
    icon: ClipboardList,
    title: "Track applications",
    text: "See every application you have sent in one place.",
  },
];

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="home-page">
      <div className="text-container">
        <div className="wrapper">
          <span className={`home-tag ${enterUp}`} style={stagger(0, 90)}>Rent smarter in your city</span>
          <h1 className={`home-title ${enterUp}`} style={stagger(1, 90)}>
            Find Real Estate & Get Your <span>Dream Place</span>
          </h1>
          <p className={`home-subtitle ${enterUp}`} style={stagger(2, 90)}>
            Browse open properties, compare prices and furnishing, and apply
            directly to landlords - all in one place.
          </p>
          <div className={enterUp} style={stagger(3, 90)}>
            <SearchBar />
          </div>
          {!isLoggedIn && DEMO_ACCOUNT && (
            <Link
              to="/auth/login"
              className={`home-demo-link ${enterUp}`}
              style={stagger(4, 90)}
            >
              Recruiter or reviewer? Try the live demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="boxes">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                className={`box ${enterUp}`}
                style={stagger(index + 5, 90)}
                key={feature.title}
              >
                <Icon className="box-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="image-container motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-700">
        <img src={bg} alt="City buildings" />
      </div>
    </div>
  );
}
