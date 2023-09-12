"use client";
import styles from "./page.module.css";
import { useTranslation } from "../../../i18n";
import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

async function Contact({ params: { lng } }) {
  const { t } = await useTranslation(lng);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{t("contactTitle")}</h1>
      </header>

      <section className={styles.contactInfo}>
        <address>
          <strong>Adres główny:</strong>
          <p>Łubna 50C</p>
          <p>05-532 Baniocha</p>
          <p>tel. +48 (22) 757 40 03</p>
          <p>biuro@tree.com.pl</p>
        </address>

        <h3>Zapytania ofertowe:</h3>
        <p>tel. +48 789 448 223</p>
        <p>ofertowanie@tree.com.pl</p>

        <h3>Serwis:</h3>
        <p>tel. +48 516 179 721</p>
        <p>serwis@tree.com.pl</p>

        <h3>Wynajem maszyn:</h3>
        <p>tel. +48 578 632 229</p>

        <h3>Transport ponadnormatywny:</h3>
        <p>tel. +48 507 200 250</p>
        <p>ponadnormatywny@tree.com.pl</p>

        <h3>Recykling kruszyw:</h3>
        <p>tel. +48 500 200 250</p>
        <p>kruszenie@tree.com.pl</p>

        <h3>Oddział Dolny Śląsk:</h3>
        <p>ul. Żwirowa</p>
        <p>54-029 Wrocław</p>
        <p>tel. +48 797 711 707 lub +48 501 681 583</p>

        <h3>Oddział Śląsk:</h3>
        <p>ul. Gzichowska 115</p>
        <p>42-504 Będzin-Łagisza</p>
        <p>tel. +48 508 376 920 lub +48 501 681 583</p>
      </section>
      <section className={styles.contactForm}>
        <h2>{t("contactFormTitle")}</h2>
        <ContactForm />
      </section>
    </div>
  );
}

export default Contact;
