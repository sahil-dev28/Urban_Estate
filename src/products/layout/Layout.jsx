import { Toaster } from "sonner";
import Navbar from "../navbar/Navbar";
import "./Layout.css";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="layout">
      <div className="header">
        <Navbar />
      </div>
      <main className="content">
        <Outlet />
      </main>
      <Toaster richColors />
    </div>
  );
}
