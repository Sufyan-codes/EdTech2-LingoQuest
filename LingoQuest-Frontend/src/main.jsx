import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import ForgottenPassword from "./pages/auth/ForgottenPassword";

import ChooseLanguage from "./pages/onboarding/ChooseLanguage";
import Onboarding1 from "./pages/onboarding/onboarding1";
import Onboarding2 from "./pages/onboarding/onboarding2";
import Onboarding3 from "./pages/onboarding/onboarding3";

import LingoAIDemo from "./pages/lingoai/LingoAIDemo";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import Lessons from "./pages/dashboard/dashboard/lessons/Lessons";
import LessonPage from "./pages/dashboard/dashboard/lessons/LessonPage";
import Quiz from "./pages/dashboard/dashboard/quiz/Quiz";

import LingoAIPage from "./pages/dashboard/dashboard/LingoAIPage.jsx";

import Leaderboard from "./pages/dashboard/dashboard/LeaderboardCard";
import Profile from "./pages/dashboard/dashboard/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WelcomeScreen from "./pages/onboarding/WelcomeScreen";
import TutorDashboard from "./pages/tutors/TutorDashboard";
import OTPVerification from "./pages/auth/Otp";
import CreateNewPassword from "./pages/auth/Newpassword";


const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
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