"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { useRouter } from "next/navigation";
import { fetchData } from "../firestore/fetchData";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [currentUserData, setCurrentUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userId = user.uid;
        const { data, error } = await fetchData("users", userId);

        if (data) {
          setCurrentUserData(data);
        }

        if (error) {
          setError(error);
        }
      } else {
        setUser(null);
        setCurrentUserData(null);
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, currentUserData, error }}>
      {children}
    </AuthContext.Provider>
  );
};
