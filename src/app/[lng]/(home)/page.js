"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import JudgeMateLogo from "../../../public/images/LOGOJUDGEMATE.png";
import LangSwitch from "./components/LangSwitch";

import { useTranslation } from "../../i18n/index";
import VersionInfo from "../(home)/components/version-info/VersionInfo";

export default function Page({ params: { lng } }) {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.elements}>
        <div className={styles.imageContainer}>
          <Image src={JudgeMateLogo} alt="JudgeMateLogo" width={320} />
        </div>

        <Link href={`/${lng}/signin`}>
          {" "}
          <button className={styles.homeButton}>{t("signInTitle")}</button>
        </Link>

        <Link href={`/${lng}/signup`}>
          {" "}
          <button className={styles.homeButton}>{t("CreateAnAccount")}</button>
        </Link>
        <LangSwitch params={{ lng }} lng={lng} />
        <VersionInfo />
      </div>
    </main>
  );
}
