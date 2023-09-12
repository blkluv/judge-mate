"use client";
import { useRouter } from "next/navigation";
import signOutUser from "../../../../../firebase/auth/signout";
import { useState, useEffect } from "react";
import { useTranslation } from "../../../../i18n/index";
function LogoutButton({ lng }) {
  const router = useRouter();

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  const handleLogout = async () => {
    const { success } = await signOutUser();
    if (success) {
      router.push(`/${lng || "pl"}/`);
    } else {
      // Optionally: Handle error if sign out fails
    }
  };

  return <button onClick={handleLogout}>Wyloguj się</button>;
}

export default LogoutButton;
