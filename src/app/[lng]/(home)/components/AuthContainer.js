import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./AuthContainer.module.css";
import { useTranslation } from "../../../i18n/index";

const AuthContainer = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.elements}>
        <div className={styles.imageContainer}>
          <img
            src="/images/JudgeMateLogotypBlack.svg"
            alt="JudgeMateLogo"
            width={320}
          />
        </div>

        <Link href={`/${lng}/signin`}>
          {" "}
          <button className={styles.homeButton}>{t("signInTitle")}</button>
        </Link>

        <Link href={`/${lng}/signup`}>
          {" "}
          <button className={styles.homeButton}>{t("CreateAnAccount")}</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthContainer;
