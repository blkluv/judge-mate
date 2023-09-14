// components/FeatureSection.js

import React from "react";

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-content">
        <h2>Główne Funkcje</h2>
        <div className="feature-list">
          <div className="feature-item">
            <i className="fas fa-trophy"></i>
            <h3>Elektroniczne Kartki Wyników</h3>
            <p>
              Sędziowie mogą łatwo wprowadzać i modyfikować wyniki w czasie
              rzeczywistym.
            </p>
          </div>

          <div className="feature-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>Harmonogram i Zarządzanie</h3>
            <p>Zintegrowany kalendarz zawodów dla lepszej organizacji.</p>
          </div>
          {/* Dodaj więcej funkcji według potrzeb */}
        </div>
      </div>
      <div className="feature-image">
        <img src="/images/feature-image.jpg" alt="JudgeMate Features" />
      </div>
    </section>
  );
};

export default FeatureSection;
