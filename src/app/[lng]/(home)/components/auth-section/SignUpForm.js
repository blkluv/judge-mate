import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../../../i18n/index";
import styles from "./SignUpForm.module.css"; // Styl formularza
import PopupAlert from "../popup-alert/PopupAlert";

const SignUpForm = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for managing popup open/close
  const [popupMessage, setPopupMessage] = useState(""); // State for storing popup message
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      setEmailError(t("emailAlreadyUsed"));
      return console.log(error);
    }

    console.log(result);

    const userUID = result.user.uid;
    const userData = {
      username: username,
      generalRole: "user",
      createdAt: new Date().toISOString(),
      email: email,
    };

    // Saving userData in users collection under userUID
    const { result: addDataResult, error: addDataError } = await addData(
      `users`, // Oto aktualizacja - zmieniono ścieżkę kolekcji
      userUID, // Przekazanie userUID jako id dla dokumentu
      userData
    );

    if (addDataError) {
      console.log("Error while adding user data:", addDataError);
    } else {
      console.log("User data has been added to Firestore:", addDataResult);
      setPopupMessage(t("activationEmailSent"));
      setShowPopup(true);
    }
  };

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <form onSubmit={handleForm} className={styles.form}>
      <h1 className={styles.heading}>{t("registerTitle")}</h1>
      <label htmlFor="username">
        <p className={styles.label}>{t("usernameLabel")}</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          name="username"
          id="username"
          placeholder={t("usernamePlaceholder")}
          className={styles.input}
        />
      </label>
      <label htmlFor="email">
        <p className={styles.label}>{t("emailLabel")}</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder={t("emailPlaceholder")}
          className={styles.input}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
      </label>
      <label htmlFor="password">
        <p className={styles.label}>{t("passwordLabel")}</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder={t("passwordPlaceholder")}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        {t("registerButton")}
      </button>

      <PopupAlert
        message={popupMessage}
        onClose={closePopup}
        isOpen={showPopup}
      />
    </form>
  );
};

export default SignUpForm;
