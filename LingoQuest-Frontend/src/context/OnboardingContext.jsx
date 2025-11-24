import React, { createContext, useContext, useEffect, useState } from "react";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  // hydrate from localStorage if available
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem("onboardingData");
      return raw ? JSON.parse(raw) : { language: null, goal: null, level: null, minutes: null, complete: false };
    } catch {
      return { language: null, goal: null, level: null, minutes: null, complete: false };
    }
  });

  useEffect(() => {
    localStorage.setItem("onboardingData", JSON.stringify(data));
  }, [data]);

  const setLanguage = (language) => setData((d) => ({ ...d, language }));
  const setGoal = (goal) => setData((d) => ({ ...d, goal }));
  const setLevel = (level) => setData((d) => ({ ...d, level }));
  const setMinutes = (minutes) => setData((d) => ({ ...d, minutes }));
  const completeOnboarding = () => setData((d) => ({ ...d, complete: true }));

  const resetOnboarding = () => {
    const empty = { language: null, goal: null, level: null, minutes: null, complete: false };
    setData(empty);
    localStorage.setItem("onboardingData", JSON.stringify(empty));
  };

  return (
    <OnboardingContext.Provider value={{
      data,
      setLanguage,
      setGoal,
      setLevel,
      setMinutes,
      completeOnboarding,
      resetOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
