import bg from "./../assets/bg.png";
import "./Home.css";
import SearchBar from "./../auth/search-input/Search";
import { BadgeCheck, CalendarCheck, ClipboardList } from "lucide-react";

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
  return (
    <div className="home-page">
      <div className="text-container">
        <div className="wrapper">
          <span className="home-tag">Rent smarter in your city</span>
          <h1 className="home-title">
            Find Real Estate & Get Your <span>Dream Place</span>
          </h1>
          <p className="home-subtitle">
            Browse open properties, compare prices and furnishing, and apply
            directly to landlords - all in one place.
          </p>
          <SearchBar />
        </div>

        <div className="boxes">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="box" key={feature.title}>
                <Icon className="box-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="image-container">
        <img src={bg} alt="City buildings" />
      </div>
    </div>
  );
}
