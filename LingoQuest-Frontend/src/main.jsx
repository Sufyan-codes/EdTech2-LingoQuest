import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import LogIn from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ForgottenPassword from "./Pages/Auth/ForgottenPassword";

import ChooseLanguage from "./Pages/Onboarding/ChooseLanguage";
import Onboarding1 from "./Pages/Onboarding/Onboarding1";
import Onboarding2 from "./Pages/Onboarding/Onboarding2";
import Onboarding3 from "./Pages/Onboarding/Onboarding3";

import LingoAIDemo from "./Pages/LingoAIDemo.jsx";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import Lessons from "./Pages/Dashboard/Dashboard/Lessons/Lessons";
import LessonPage from "./Pages/Dashboard/Dashboard/Lessons/LessonPage";
import Quiz from "./Pages/Dashboard/Dashboard/Quiz/Quiz";

import LingoAIPage from "./Pages/Dashboard/Dashboard/LingoAIPage.jsx";

import Leaderboard from "./Pages/Dashboard/Dashboard/LeaderboardCard";
import Profile from "./Pages/Dashboard/Dashboard/profile/Profile"; 
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WelcomeScreen from "./Pages/Onboarding/WelcomeScreen";
import TutorDashboard from "./Pages/Tutors/TutorDashboard";
import OTPVerification from "./Pages/Auth/Otp";
import CreateNewPassword from "./Pages/Auth/Newpassword";


const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgottenPassword />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path='/newpassword' element={<CreateNewPassword />} />
      <Route path="/onboarding" element={<WelcomeScreen/>} />
      <Route path="/language" element={<ChooseLanguage />} />
      <Route path="/onboarding1" element={<Onboarding1 />} />
      <Route path="/onboarding2" element={<Onboarding2 />} />
      <Route path="/onboarding3" element={<Onboarding3 />} />

      <Route path="/lingo-ai-demo" element={<LingoAIDemo />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/lessons/:lessonId/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/lingoai" element={<LingoAIPage />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OnboardingProvider>
          <RouterProvider router={router} />
        </OnboardingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);