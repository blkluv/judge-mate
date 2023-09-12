import { AuthContextProvider } from "../../../../firebase/context/AuthContext";
import { dir } from "i18next";
import { languages } from "../../../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function AdminLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>My App</title>
      </head>
      <body>
        <AuthContextProvider>
          <div>{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
