"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "../../../../../i18n/index";
import styles from "./NavbarDashboard.module.css";
import LogoutButton from "../../user-profile/components/LogoutButton";
import UserProfile from "./UserProfile";

const NavbarDashboard = ({ params: { lng } }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div className={styles.navbar}>
      <div className={styles.ContainerNavbarLogo}>
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
      </div>
      <div className={styles.ContainerMenu}>
        <div className={styles.navbarLinks}>
          <ul>
            <li>
              <Link href="/dashboard/create-event">{t("createEvent")}</Link>
            </li>
            <li>
              <Link href="/dashboard/my-events">{t("myEvents")}</Link>
            </li>
            <li>
              <Link href="/dashboard/events-base">{t("eventsBase")}</Link>
            </li>
            <li>
              <Link href="/dashboard/user-profile">{t("profile")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.ContainerNavbarUserProfile}>
        {" "}
        <UserProfile />
      </div>{" "}
    </div>
  );
};

export default NavbarDashboard;
