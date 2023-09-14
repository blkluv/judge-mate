"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";

import { useTranslation } from "../../i18n/index";
import VersionInfo from "../(home)/components/version-info/VersionInfo";
import WelcomeSection from "./components/WelcomeSection";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import SupportSection from "./components/SupportSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AuthContainer from "./components/auth-section/AuthContainer";

export default function Page({ params: { lng } }) {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <div>
      <AuthContainer lng={lng} />
      <WelcomeSection lng={lng} />
      <FeatureSection lng={lng} />
      <AboutSection lng={lng} />
      <SupportSection lng={lng} />
      <TestimonialsSection lng={lng} />
    </div>
  );
}
