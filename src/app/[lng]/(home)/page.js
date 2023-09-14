"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import LangSwitch from "./components/LangSwitch";
import { useTranslation } from "../../i18n/index";
import VersionInfo from "../(home)/components/version-info/VersionInfo";
import WelcomeSection from "./components/WelcomeSection";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import SupportSection from "./components/SupportSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Page({ params: { lng } }) {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div>
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
            <button className={styles.homeButton}>
              {t("CreateAnAccount")}
            </button>
          </Link>
          <LangSwitch params={{ lng }} lng={lng} />
          {/* <VersionInfo /> */}
        </div>
      </div>
      <WelcomeSection />
      <FeatureSection />
      <AboutSection />
      <SupportSection />
      <TestimonialsSection />
    </div>
  );
}
