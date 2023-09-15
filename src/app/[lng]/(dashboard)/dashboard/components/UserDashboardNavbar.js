"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "../../../../i18n/index";
import styles from "./UserDashboardNavbar.module.css";

const UserDashboardNavbar = ({ params: { lng } }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link href="/dashboard/">
          {" "}
          <img
            src="/images/JudgeMateLogotypBlack.svg"
            alt="logo"
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles.navbarLinks}>
        <ul>
          <li>
            <Link href="/dashboard/create-event">{t("createEvent")}</Link>
          </li>
          <li>
            <Link href="/dashboard/my-events">{t("myEvents")}</Link>
          </li>
          <li>
            <Link href="/dashboard/profile">{t("Profile")}</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">{t("Settings")}</Link>
          </li>
          <li>
            <Link href="/dashboard/logout">{t("Logout")}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;