import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import api from "../services/api";

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          console.log("Firebase ID Token:", token);
          console.log("Firebase UID:", currentUser.uid);
          console.log("User Email:", currentUser.email);
          console.log("User Display Name:", currentUser.displayName);

          // Store token in localStorage for API calls
          localStorage.setItem("authToken", token);

          // Fetch user profile from backend to get role and other data
          setProfileLoading(true);
          try {
            const userProfile = await api.request("/auth/me");
            console.log("User profile from backend:", userProfile);

            // Merge Firebase user data with backend user data
            const mergedUser = {
              ...currentUser,
              ...userProfile.user,
              // Keep Firebase-specific properties
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            };

            console.log("Merged user data:", mergedUser);
            setUser(mergedUser);
          } catch (profileError) {
            console.error("Failed to fetch user profile:", profileError);
            console.log("Falling back to Firebase user data only");
            // Fallback to Firebase user data only
            setUser(currentUser);
          } finally {
            setProfileLoading(false);
          }
        } catch (error) {
          console.error("Error getting Firebase token:", error);
          setUser(null);
        }
      } else {
        console.log("No user logged in");
        setUser(null);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, profileLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
