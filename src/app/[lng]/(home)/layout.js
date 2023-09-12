import "./globals.css";
import React from "react";

import { dir } from "i18next";
import { languages } from "../../i18n/settings";

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
        <div>{children}</div>
      </body>
    </html>
  );
}
