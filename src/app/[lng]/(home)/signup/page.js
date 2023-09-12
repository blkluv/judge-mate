"use client";
import React from "react";
import signUp from "../../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import addData from "../../../../firebase/firestore/addData";

import JudgeMateLogo from "../../../../public/images/LOGOJUDGEMATE.png";
import Image from "next/image";
import PopupAlert from "../components/popup-alert/PopupAlert"; // Import PopupAlert

import styles from "./page.module.css";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false); // State for managing popup open/close
  const [popupMessage, setPopupMessage] = React.useState(""); // State for storing popup message
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      setEmailError("Email został już wykorzystany.");
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
      setPopupMessage(
        "Na wskazany przy rejestracji adres email został wysłany link aktywacyjny. Aktywuj konto klikając w link"
      );
      setShowPopup(true);
    }
  };

  const handleGoToHomePage = () => {
    router.push("/");
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    router.push("/signin");
  };

  return (
    <div className={styles.wrapper}>
      <PopupAlert
        message={popupMessage}
        onClose={handlePopupClose}
        isOpen={showPopup}
      />
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.formWrapper}>
        <Image src={JudgeMateLogo} alt="JudgeMateLogo" width={320} />
        <h1 className={styles.title}>Zarejestruj się</h1>
        <form onSubmit={handleForm} className={styles.form}>
          <label htmlFor="username">
            <p className={styles.label}>Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              id="username"
              placeholder="Twoja nazwa użytkownika"
              className={styles.input}
            />
          </label>
          <label htmlFor="email">
            <p className={styles.label}>Email</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
              type="email"
              name="email"
              id="email"
              placeholder="przykladowy@mail.com"
              className={styles.input}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </label>
          <label htmlFor="password">
            <p className={styles.label}>Twoje hasło</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Twoje hasło"
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Zarejestruj się
          </button>
        </form>
        <button className={styles.button} onClick={handleGoToHomePage}>
          Powrót na stronę główną
        </button>
      </div>
    </div>
  );
}

export default Page;
