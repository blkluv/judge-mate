import "../../(home)/globals.css";

import { AuthContextProvider } from "../../../../firebase/context/AuthContext";

import { dir } from "i18next";
import { languages } from "../../../i18n/settings";

export const metadata = {
  title: "JudgeMate",
  description: "Best Judge APP",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function DashboardLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>JudgeMate</title>
      </head>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
