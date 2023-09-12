"use client";
import React, { useEffect, useState } from "react";
import BranchSegment from "./components/BranchSegment";
import styles from "./page.module.css";
import WelcomeVideo from "./components/WelcomeVideo";
import Link from "next/link";
import { useTranslation } from "../../i18n";
import PartnersCarousel from "./components/PartnersCarousel";

async function HomePage({ params: { lng } }) {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <WelcomeVideo></WelcomeVideo>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/contact`}>KONTAKT</Link>

      <section className={styles.about}>
        <h1>O nas</h1>
        <p>
          Grupa TREE wyspecjalizowała się w obsłudze inwestycji budowlanych. W
          ciągu prawie 20 lat działalności staliśmy się pionierem...
        </p>
        {/* Reszta tekstu */}
      </section>
      <section className={styles.services}>
        <h1>Usługi sprzętowo-transportowe</h1>
        <p>
          Skuteczność naszych działań zawdzięczamy bogatemu doświadczeniu...
        </p>
        {/* Reszta tekstu */}
      </section>
      <BranchSegment
        imageSrc="https://www.tree.com.pl/wp-content/uploads/2020/05/IMG_4117-1.jpg"
        companyName="Tree Serwis"
        services="Serwis Maszyn Budowlanych,Diagnostyka,Naprawy,Pomoc Drogowa"
        heading="Twoje sprzęt budowlany zawsze w najlepszej formie"
        buttonText="Dowiedz się więcej"
      />
      <section className={styles.clients}>
        <h1>Nasi kontrahenci</h1>
        <PartnersCarousel />
      </section>
      <BranchSegment
        imageSrc="https://forscience.pl/wp-content/uploads/2020/04/RJR-cover-image.jpg"
        companyName="Tree Recykling"
        services="Zakres recyklingu,Proces recyklingu,Ochrona środowiska,Usługi dodatkowe"
        heading="Recykling dla lepszego jutra"
        buttonText="Dowiedz się więcej"
      />

      <section className={styles.contact}>
        <h1>Kontakt</h1>
        {/* Możesz dodać formularz kontaktowy lub inne dane kontaktowe */}
      </section>
    </div>
  );
}

export default HomePage;
