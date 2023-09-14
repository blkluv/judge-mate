import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../i18n/index";

export default function WelcomeSection({ lng }) {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <h1>{t("welcomeTitle")}</h1>
        <p>{t("welcomeDescription1")}</p>
        <p>{t("welcomeDescription2")}</p>
      </div>
      <div className="welcome-image">
        <img
          src="/images/JudgemateLogotypBlack.svg"
          alt="JudgeMate"
          width="320px"
        />
      </div>
    </section>
  );
}
