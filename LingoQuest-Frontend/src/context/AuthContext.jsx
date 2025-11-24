import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? { email: "mock" } : null
  );

  // SIGNUP
  const signup = async ({ fullName, email, password }) => {
    // mock delay
    await new Promise((r) => setTimeout(r, 500));

    // SUCCESS
    localStorage.setItem("token", "demo-token");
    setUser({ fullName, email });

    return { success: true };
  };

  // LOGIN
  const login = async ({ email, password }, rememberMe) => {
    await new Promise((r) => setTimeout(r, 500));

    if (rememberMe) {
      localStorage.setItem("token", "demo-token");
    }

    setUser({ email });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
