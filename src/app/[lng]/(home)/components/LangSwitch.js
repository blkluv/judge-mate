"use client";
import React, { useState, useEffect } from "react";

import { useTranslation } from "../../../i18n/index";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const LangSwitch = ({ params: { lng } }) => {
  const [t, setT] = useState(() => () => ""); // Inicjalizacja

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return <LanguageSwitcher lng={lng} />;
};

export default LangSwitch;
