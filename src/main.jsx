import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import Login from "./auth/login/Login";
import Home from "./../src/home/Home";
import VerifyEmail from "./auth/verify-email/VerifyEmail";
import ResetPassword from "./auth/reset-password/ResetPassword";
import PropertyList from "./components/property/PropertyList";
import ProfilePage from "./auth/profile/profile";
import Layout from "./products/layout/Layout";
import RequiredAuth from "./products/layout/RequiredAuth";
import RedirectIfLoggedIn from "./products/layout/RedirectIfLoggedIn";
import ForgetPassword from "./auth/forget-password/ForgetPassword";
import PropertyPage from "./property/[ id ]/PropertyPage";
import ApplicationList from "./components/application/ApplicationList";
import UserPropertiesList from "./auth/user/property/UserPropertiesList";
import RegisterForm from "./auth/register/Register";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "auth/login",
        element: (
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "auth/register",
        element: (
          <RedirectIfLoggedIn>
            <RegisterForm />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "auth/verify",
        element: (
          <RedirectIfLoggedIn>
            <VerifyEmail />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "auth/forgot-password",
        element: (
          <RedirectIfLoggedIn>
            <ForgetPassword />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "auth/reset-password",
        element: (
          <RedirectIfLoggedIn>
            <ResetPassword />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "profile",
        element: (
          <RequiredAuth>
            <ProfilePage />
          </RequiredAuth>
        ),
      },
      { path: "property", element: <PropertyList /> },
      { path: "property/:id", element: <PropertyPage /> },
      { path: "application", element: <ApplicationList /> },
      { path: "/property/my", element: <UserPropertiesList /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
