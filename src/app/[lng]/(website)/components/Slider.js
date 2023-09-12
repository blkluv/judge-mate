import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";

// Załóżmy, że mamy listę obrazów, które chcemy wyświetlić w sliderze
const images = [
  "https://www.tree.com.pl/wp-content/uploads/2015/10/foto1.jpg",
  "https://www.tree.com.pl/wp-content/uploads/2015/10/foto2.jpg"
  // ...
  ,
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // zmienia obraz co 3 sekundy

    // Sprzątanie po sobie - usuwanie timera
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider}>
      {images.map((image, index) => (
        <div
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ""
          }`}
          key={index}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default Slider;
