"use client";
import React, { useState, useCallback, useEffect } from "react";
import signIn from "../../../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase_app from "../../../../firebase/config";
import Modal from "./ModalPopup";
import PopupAlert from "../components/popup-alert/PopupAlert";
import Loading from "../loading";
import { useTranslation } from "../../../i18n/index";

import Image from "next/image";

import JudgeMateLogo from "../../../../public/images/LOGOJUDGEMATE.png";

const auth = getAuth(firebase_app);

function Page({ params: { lng } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const router = useRouter();

  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      setFormErrors({});

      if (!email || !password) {
        setPopupMessage("Oba pola są wymagane.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      const { result, error, isVerified } = await signIn(email, password); // Dodane pole isVerified

      if (error) {
        let errorMessage;
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage =
              "Nie znaleziono użytkownika z podanym adresem email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Podane hasło jest nieprawidłowe.";
            break;
          default:
            errorMessage =
              "Wystąpił błąd podczas logowania. Spróbuj ponownie później.";
        }
        setPopupMessage(errorMessage);
        setShowPopup(true);
      } else {
        if (!isVerified) {
          // Sprawdzanie, czy użytkownik jest zweryfikowany
          setPopupMessage("Proszę zweryfikować swój email przed zalogowaniem.");
          setShowPopup(true);
        } else {
          console.log(result);
          router.push(`/${lng}/dashboard`);
        }
      }

      setLoading(false);
    },
    [email, password, router]
  );

  const handleGoToHomePage = useCallback(() => {
    router.push(`/${lng}/`);
  }, [router]);

  const handleForgotPassword = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleResetPassword = useCallback(async (email) => {
    setShowModal(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setPopupMessage("Wysłaliśmy email z linkiem do resetowania hasła");
      setShowPopup(true);
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas wysyłania maila do resetowania hasła:",
        error
      );
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Nie znaleziono użytkownika z podanym adresem email.";
          break;
        default:
          errorMessage = "Wystąpił błąd. Spróbuj ponownie później.";
      }
      setPopupMessage(errorMessage);
      setShowPopup(true);
    }
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div className={styles.mainContainer}>
      {isLoading && <Loading />}{" "}
      {/* Wyświetlaj komponent ładowania, gdy isLoading jest true */}
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <Image src={JudgeMateLogo} alt="JudgeMateLogo" width={320} />
          <h1 className={styles.heading}>{t("signInTitle")}</h1>
          <form onSubmit={handleForm} className={styles.form}>
            <label htmlFor="email">
              <p className={styles.label}>{t("emailLabel")}</p>
              <div className={styles.inputContainer}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                  className={styles.input}
                />
              </div>
            </label>

            <label htmlFor="password">
              <p className={styles.label}>{t("passwordLabel")}</p>
              <div className={styles.inputContainer}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("passwordPlaceholder")}
                  className={styles.input}
                />
              </div>
            </label>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? t("loggingIn") : t("signInBtn")}
            </button>
            {formErrors.message && <p>{formErrors.message}</p>}

            <button
              className={styles.button}
              onClick={handleForgotPassword}
              type="button"
            >
              {t("remindPassword")}
            </button>
          </form>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onResetPassword={handleResetPassword}
          />

          <PopupAlert
            message={popupMessage}
            onClose={closePopup}
            isOpen={showPopup}
          />

          <button className={styles.button} onClick={handleGoToHomePage}>
            {t("returnToHomepage")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
