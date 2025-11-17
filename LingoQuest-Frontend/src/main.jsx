import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import LogIn from "./Pages/Auth/LogIn";
import Signup from "./Pages/Auth/Signup";
import ForgottenPassword from "./Pages/Auth/ForgottenPassword";
import WelcomeScreen from "./Pages/Onboarding/WelcomeScreen";
import ChooseLanguage from "./Pages/Onboarding/ChooseLanguage";
import Onboarding1 from "./Pages/Onboarding/Onboarding1";
import Onboarding2 from "./Pages/Onboarding/Onboarding2";
import Onboarding3 from "./Pages/Onboarding/Onboarding3";
import Dashboard from "./Pages/Dashboard.jsx/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgottenPassword />} />
      <Route path="/onboarding" element={<WelcomeScreen />} />
      <Route path="/language" element={<ChooseLanguage />} />
      <Route path="/onboarding1" element={<Onboarding1 />} />
      <Route path="/onboarding2" element={<Onboarding2 />} />
      <Route path="/onboarding3" element={<Onboarding3 />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
