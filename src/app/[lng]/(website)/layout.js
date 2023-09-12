import "./globals.css";
import styles from "./layout.module.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { dir } from "i18next";
import { languages } from "../../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function AppLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>My App</title>
      </head>
      <body>
        <Navbar params={{ lng }} lng={lng} />
        <div className={styles.mainWrapper}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
