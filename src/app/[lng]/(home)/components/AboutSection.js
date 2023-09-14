import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>O Aplikacji JudgeMate</h2>
        <p>
          JudgeMate to przełomowa platforma do zarządzania i śledzenia wyników w
          zawodach sportowych, skoncentrowana pierwotnie na sportach
          ekstremalnych. Jest to miejsce, w którym sędziowie, zawodnicy i fani
          mogą wziąć czynny udział w każdym etapie zawodów.
        </p>
        <p>Aplikacja wprowadza nowy poziom interaktywności i społeczności.</p>
      </div>
      <div className="about-image">
        <img src="/images/about-image.jpg" alt="O Aplikacji JudgeMate" />
      </div>
    </section>
  );
};

export default AboutSection;
