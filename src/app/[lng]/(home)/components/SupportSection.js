import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../i18n/index";

const SupportSection = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);
  return (
    <section className="support-section">
      <div className="support-content">
        <h2>{t("supportTitle")}</h2>
        <p>{t("supportDescription1")}</p>
        <p>{t("supportDescription2")}</p>
        <p>
          {t("contactUs")}{" "}
          <a href="mailto:support@judgemate.com">support@judgemate.com</a>{" "}
          {t("orUseContactForm")}
        </p>
      </div>
    </section>
  );
};

export default SupportSection;
