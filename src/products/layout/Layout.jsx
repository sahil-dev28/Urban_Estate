import { Toaster } from "sonner";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";
import { Outlet } from "react-router";
import { useResolvedTheme } from "../../hooks/useResolvedTheme";

export default function Layout() {
  const theme = useResolvedTheme();

  return (
    <div className="layout">
      <div className="header">
        <Navbar />
      </div>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors theme={theme} />
    </div>
  );
}
