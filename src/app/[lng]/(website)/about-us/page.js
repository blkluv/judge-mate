"use client";
import styles from "./page.module.css";
import { useTranslation } from "../../../i18n";
import React, { useEffect, useState } from "react";

async function AboutUs({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>O nas - Grupa Tree</h1>
      </header>

      <section className={styles.history}>
        <h2>Historia</h2>
        <p>
          Grupa TREE wyspecjalizowała się w obsłudze inwestycji budowlanych. (i
          tak dalej)
        </p>
      </section>

      <section className={styles.services}>
        <h2>Usługi sprzętowo-transportowe</h2>
        <p>
          Skuteczność naszych działań zawdzięczamy bogatemu... (i tak dalej)
        </p>
      </section>

      <section className={styles.association}>
        <h2>European Demolition Association – EDA</h2>
        <p>
          Stowarzyszenie European Demolition Association, EDA... (i tak dalej)
        </p>
      </section>

      <footer className={styles.footer}>
        <p>Zapraszamy do współpracy!</p>
      </footer>
    </div>
  );
}

export default AboutUs;
