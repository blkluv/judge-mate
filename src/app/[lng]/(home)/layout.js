import styles from "./globals.css";
import React from "react";
import { dir } from "i18next";
import { languages } from "../../i18n/settings";
import Navbar from "../(home)/components/Navbar";
import Footer from "../(home)/components/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function AppLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>JudgeMate</title>
      </head>
      <body>
        <Navbar params={{ lng }} lng={lng} />
        <div>{children}</div>
        <Footer lng={lng} />
      </body>
    </html>
  );
}
