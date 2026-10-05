import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src={logo} alt="logo" className="w-6" />
          <span>UrbanEstate</span>
        </Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/property" className="hover:text-black">
            Properties
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UrbanEstate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
