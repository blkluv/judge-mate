import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../i18n/index";

const FeatureSection = ({ lng }) => {
  const [t, setT] = useState(() => () => "");

  useEffect(() => {
    (async () => {
      const { t: translationFunction } = await useTranslation(lng);
      setT(() => translationFunction);
    })();
  }, [lng]);

  return (
    <section className="feature-section">
      <div className="feature-content">
        <h2>{t("featureTitle")}</h2>
        <div className="feature-list">
          <div className="feature-item">
            <i className="fas fa-trophy"></i>
            <h3>{t("scorecardsTitle")}</h3>
            <p>{t("scorecardsDescription")}</p>
          </div>

          <div className="feature-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>{t("scheduleManagementTitle")}</h3>
            <p>{t("scheduleManagementDescription")}</p>
          </div>
          {/* Dodaj więcej funkcji według potrzeb */}
        </div>
      </div>
      <div className="feature-image">
        <img
          src="/images/JudgemateLogotypBlack.svg"
          alt="JudgeMate"
          width="320px"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
