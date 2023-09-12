"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../firebase/context/AuthContext";
import { useTranslation } from "../../../i18n";
import SideMenu from "./components/SideMenu";
import styles from "./page.module.css";

function Page({ params: { lng } }) {
  const { user, loading } = useAuthContext();
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  if (loading || user == null) return <div>Loading...</div>;

  return (
    <section className={styles.adminpanel}>
      <SideMenu params={{ lng }} lng={lng} />
      <div className={styles.content}>
        <h1>Only logged in users can view this page</h1>
        <li>{t("onlyLogedUser")}</li>
      </div>
    </section>
  );
}

export default Page;
