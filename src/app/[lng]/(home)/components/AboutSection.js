import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../i18n/index";

const AboutSection = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <section className="about-section">
      <div className="about-content">
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutDescription1")}</p>
        <p>{t("aboutDescription2")}</p>
        <p>{t("aboutDescription3")}</p>
      </div>
      <img
        src="/images/JudgemateLogotypBlack.svg"
        alt="JudgeMate"
        width="320px"
      />
    </section>
  );
};

export default AboutSection;
