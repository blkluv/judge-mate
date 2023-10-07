import "../../(home)/globals.css";
import { AuthContextProvider } from "../../../../firebase/context/AuthContext";
import { dir } from "i18next";
import { languages } from "../../../i18n/settings";
import NavbarDashboard from "./components/navbar-dashboard/NavbarDashboard";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body suppressHydrationWarning={true}>
        <AuthContextProvider>
          {" "}
          <NavbarDashboard params={{ lng }} lng={lng} />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
