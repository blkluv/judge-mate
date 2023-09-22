import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./AuthContainer.module.css";
import { useTranslation } from "../../../../i18n/index";

import SignInForm from "./SignInForm"; // Import formularza logowania
import SignUpForm from "./SignUpForm"; // Import formularza rejestracji

const AuthContainer = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  const [activeTab, setActiveTab] = useState("signIn"); // Dodany stan aktywnej zakładki

  const toggleTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.mainForm}>
        {activeTab === "signIn" ? (
          <SignInForm lng={lng} />
        ) : (
          <SignUpForm lng={lng} />
        )}{" "}
        <div className={styles.elements}>
          <div className={styles.tabs}>
            <button
              className={`${styles.buttonBlue} ${
                activeTab === "signIn" ? styles.activeTab : ""
              }`}
              onClick={() => toggleTab("signIn")}
            >
              {t("signInTitle")}
            </button>
            <button
              className={`${styles.buttonBlue} ${
                activeTab === "signUp" ? styles.activeTab : ""
              }`}
              onClick={() => toggleTab("signUp")}
            >
              {t("CreateAnAccount")}
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AuthContainer;
