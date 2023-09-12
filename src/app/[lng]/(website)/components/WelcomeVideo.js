import React from "react";
import styles from "./WelcomeVideo.module.css";

const WelcomeVideo = () => {
  return (
    <div className={styles.videoContainer}>
      <video className={styles.videoPlayer} autoPlay loop muted playsInline>
        {/* Note the direct path reference here */}
        <source src="/mainVid.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzania wideo.
      </video>
    </div>
  );
};

export default WelcomeVideo;
