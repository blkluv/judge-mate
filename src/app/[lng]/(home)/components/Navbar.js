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
        <Link href={`/${lng}/`}>
          <img
            src="/images/JudgeMateLogotypBlack.svg"
            alt="logo"
            className={styles.logo}
          />
        </Link>
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
            <Link className={styles.link} href={`/${lng}/features`}>
              <li
                className={router.pathname === "/features" ? styles.active : ""}
              >
                Funkcje
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/about-us`}>
              <li
                className={router.pathname === "/about-us" ? styles.active : ""}
              >
                O nas
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/support`}>
              <li
                className={router.pathname === "/support" ? styles.active : ""}
              >
                Wsparcie
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/faq`}>
              <li className={router.pathname === "/faq" ? styles.active : ""}>
                FAQ
              </li>
            </Link>

            {/* Dodatkowe linki */}
            <Link className={styles.link} href={`/${lng}/pricing`}>
              <li
                className={router.pathname === "/pricing" ? styles.active : ""}
              >
                Cennik
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/blog`}>
              <li className={router.pathname === "/blog" ? styles.active : ""}>
                Blog
              </li>
            </Link>
            <Link className={styles.link} href={`/${lng}/contact-us`}>
              <li
                className={
                  router.pathname === "/contact-us" ? styles.active : ""
                }
              >
                Kontakt
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
