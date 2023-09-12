"use client";
import React, { useEffect, useState } from "react";
import LogoutButton from "../../admin/components/LogoutButton";
import styles from "./SideMenu.module.css";
import { useTranslation } from "../../../../i18n/index";

const logoPath = "/assets/TREE_Grupa_LOGO.png";

function SideMenu({ params: { lng } }) {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div className={styles.menu}>
      {/* Use the direct path in the src attribute */}
      <div>
        <img className={styles.logo} src={logoPath} alt="Company Logo" />
      </div>
      <ul className={styles.list}>
        <li>Projekty</li>
        <li>Partnerzy</li>
        <li>Wyróżnienia</li>
      </ul>
      <LogoutButton lng={lng} />
    </div>
  );
}

export default SideMenu;
