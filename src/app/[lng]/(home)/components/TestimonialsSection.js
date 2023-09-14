import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonial">
        <p>
          "JudgeMate to rewolucja w śledzeniu wyników sportowych. Używam tej
          aplikacji od kilku miesięcy i jestem zachwycony jej funkcjonalnością.
          Polecam ją każdemu, kto jest związany ze sportem!"
        </p>
        <p className="testimonial-author">- Jan Kowalski, sędzia sportowy</p>
      </div>
      <div className="testimonial">
        <p>
          "Dzięki JudgeMate mogę śledzić wyniki moich ulubionych zawodników w
          czasie rzeczywistym. To niesamowite, jak ta aplikacja sprawia, że
          czuję się bliżej wydarzeń sportowych."
        </p>
        <p className="testimonial-author">- Anna Nowak, fanka sportu</p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
