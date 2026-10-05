import { Toaster } from "sonner";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";
import { Outlet, useLocation } from "react-router";
import { useResolvedTheme } from "../../hooks/useResolvedTheme";

export default function Layout() {
  const theme = useResolvedTheme();
  const { pathname } = useLocation();

  return (
    <div className="layout">
      <div className="header">
        <Navbar />
      </div>
      <main className="content">
        <div
          key={pathname}
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
        >
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster richColors theme={theme} />
    </div>
  );
}
