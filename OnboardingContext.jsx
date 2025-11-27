// src/context/OnboardingContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./LingoQuest-Frontend/src/context/AuthContext";
import api from "./LingoQuest-Frontend/src/services/api";

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const { updateUser } = useAuth();
  const [data, setData] = useState({
    language: null,
    goal: null,
    level: null,
    minutes: null,
  });

  const setLanguage = (language) => {
    setData((prev) => ({ ...prev, language }));
  };

  const setGoal = (goal) => {
    setData((prev) => ({ ...prev, goal }));
  };

  const setLevel = (level) => {
    setData((prev) => ({ ...prev, level }));
  };

  const setMinutes = (minutes) => {
    setData((prev) => ({ ...prev, minutes }));
  };

  const completeOnboarding = async () => {
    try {
      // Update user profile on backend with onboarding data
      const updates = {
        targetLanguage: data.language?.code || data.language || "English",
        // You can add more fields to your User model if needed
        // goal: data.goal,
        // level: data.level,
        // dailyGoal: data.minutes
      };

      // Update backend
      await api.patch("/users/profile", updates);

      // Update local user state
      updateUser(updates);

      return { success: true };
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      
      // Fallback: update local storage even if backend fails
      updateUser({
        targetLanguage: data.language?.code || data.language || "English"
      });
      
      return { success: true }; // Continue anyway
    }
  };

  const value = {
    data,
    setLanguage,
    setGoal,
    setLevel,
    setMinutes,
    completeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};