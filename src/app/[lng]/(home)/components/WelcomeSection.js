import React from "react";

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <h1>Witaj w JudgeMate!</h1>
        <p>
          JudgeMate to przełomowa platforma do zarządzania i śledzenia wyników w
          zawodach sportowych.
        </p>
        <p>
          Jest to miejsce, w którym sędziowie, zawodnicy i fani mogą wziąć
          czynny udział w każdym etapie zawodów.
        </p>
      </div>
      <div className="welcome-image">
        <img src="/images/welcome-image.jpg" alt="JudgeMate" />
      </div>
    </section>
  );
};

export default WelcomeSection;
