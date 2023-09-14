import React from "react";
import styles from "./Footer.module.css"; // Assuming you're using CSS modules
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/images/judgemate-logo.png"
            alt="JudgeMate Logo"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h3 className={styles.title}>O Aplikacji</h3>
            <Link href="/about">O Nas</Link>
            <Link href="/features">Funkcje</Link>
            <Link href="/support">Wsparcie</Link>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Zasoby</h3>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Kontakt</Link>
            <Link href="/terms">Regulamin</Link>
          </div>
        </div>
        <div className={styles.copy}>
          <p>
            &copy; {new Date().getFullYear()} JudgeMate. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
