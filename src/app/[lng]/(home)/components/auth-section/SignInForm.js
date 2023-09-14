import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../../../i18n/index";
import PopupAlert from "../popup-alert/PopupAlert";
import signIn from "../../../../../firebase/auth/signin";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase_app from "../../../../../firebase/config";
import Modal from "./ModalPopup";
import styles from "./SignInForm.module.css";

const auth = getAuth(firebase_app);
const SignInForm = ({ lng }) => {
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

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? t("loggingIn") : t("signInBtn")}
      </button>

      {formErrors.message && <p>{formErrors.message}</p>}

      <a className={styles.forgotPasswordLink} onClick={handleForgotPassword}>
        {t("remindPassword")}
      </a>
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
    </form>
  );
};

export default SignInForm;
