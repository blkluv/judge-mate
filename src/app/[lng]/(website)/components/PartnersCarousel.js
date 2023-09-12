import React, { useState, useEffect, useRef } from "react";

import styles from "./PartnersCarousel.module.css";

export const PartnersCarousel = () => {
  const images = [
    { src: "/assets/twitter.png", alt: "Partner 1" },
    { src: "/assets/facebook.png", alt: "Partner 2" },
    { src: "/assets/google.png", alt: "Partner 3" },
    { src: "/assets/nike.png", alt: "Partner 4" },
    { src: "/assets/uber.png", alt: "Partner 5" },
    { src: "/assets/youtube.png", alt: "Partner 6" },
    { src: "/assets/twitter.png", alt: "Partner 1" },
    { src: "/assets/facebook.png", alt: "Partner 2" },
    { src: "/assets/google.png", alt: "Partner 3" },
    { src: "/assets/nike.png", alt: "Partner 4" },
    { src: "/assets/uber.png", alt: "Partner 5" },
    { src: "/assets/youtube.png", alt: "Partner 6" },
    //... add more images directly if you have more partners
  ];
  const carouselContainerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const scrollAmount = 1; // Adjust this value for faster/slower scroll

    const scrollInterval = setInterval(() => {
      if (carouselContainerRef.current) {
        const container = carouselContainerRef.current;

        // If reached the end of the scroll to the right
        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth
        ) {
          setScrollDirection(-1);
        }

        // If reached the start of the scroll to the left
        if (container.scrollLeft === 0) {
          setScrollDirection(1);
        }

        container.scrollLeft += scrollAmount * scrollDirection;
      }
    }, 30); // Adjust this value for faster/slower interval

    return () => clearInterval(scrollInterval); // Clean up the interval on component unmount
  }, [scrollDirection]);

  return (
    <div className={styles.carouselContainer} ref={carouselContainerRef}>
      {images.map((image, index) => (
        <img
          className={styles.carouselItem}
          key={index}
          src={image.src}
          alt={image.alt}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default PartnersCarousel;
