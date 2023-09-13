"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../../i18n/index";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const Navbar = ({ params: { lng } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [t, setT] = useState(() => () => ""); // Inicjalizacja

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarInner}>
        <img
          src="/images/LOGOJUDGEMATE.png"
          alt="logo"
          height={50}
          className={styles.logo}
        />

        <div onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && (
            <Image
              src="/icons/hamburger.svg"
              alt="menu icon"
              width={50}
              height={50}
              className={styles.icon}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <Image
          src="/icons/close.svg"
          alt="close icon"
          width={50}
          height={50}
          className={`${styles.icon} ${styles.iconOnTop}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className={styles.sidebar}>
          <ul>
            <Link className={styles.link} href={`/${lng}/`}>
              <li className={router.pathname === "/" ? styles.active : ""}>
                Strona domowa
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/about-us`}>
              <li
                className={router.pathname === "/about-us" ? styles.active : ""}
              >
                O nas
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/contact`}>
              <li
                className={router.pathname === "/contact" ? styles.active : ""}
              >
                Kontakt
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/business`}>
              <li
                className={router.pathname === "/business" ? styles.active : ""}
              >
                Oferta
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/treeshop`}>
              <li
                className={router.pathname === "/treeshop" ? styles.active : ""}
              >
                Butik cyrkulacyjny
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/signin`}>
              <li
                className={router.pathname === "/signin" ? styles.active : ""}
              >
                Zaloguj
              </li>
            </Link>
            <li>
              <LanguageSwitcher lng={lng} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
