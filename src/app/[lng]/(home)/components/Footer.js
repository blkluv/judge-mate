"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../i18n/index";
import styles from "./Footer.module.css"; // Załóżmy, że używasz modułów CSS
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const Footer = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/images/JudgeMateLogotypWhite.svg"
            alt={t("judgeMateLogoAlt")}
            width={100}
            height={100}
          />
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h3 className={styles.title}>{t("aboutTitleFooter")}</h3>
            <Link href={`/${lng}/about`}>{t("aboutUs")}</Link>
            <Link href={`/${lng}/features`}>{t("features")}</Link>
            <Link href={`/${lng}/support`}>{t("support")}</Link>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>{t("resourcesTitle")}</h3>
            <Link href={`/${lng}/faq`}>{t("faq")}</Link>
            <Link href={`/${lng}/contact`}>{t("contact")}</Link>
            <Link href={`/${lng}/terms`}>{t("termsAndConditions")}</Link>
          </div>
        </div>
        <div className={styles.copy}>
          <p>
            &copy; {new Date().getFullYear()} {t("copyRights")}
          </p>
          <LanguageSwitcher lng={lng} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
