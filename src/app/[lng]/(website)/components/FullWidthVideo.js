import React, { useState } from "react";
import YouTube from "react-youtube";
import styles from "./FullWidthVideo.module.css";

function FullWidthVideo() {
  const [height, setHeight] = useState(0);
  const videoId = "aWuYbBH8OkI"; // replace with your YouTube video's ID

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      controls: 0,
      autoplay: 1, // <-- This line was changed
      disablekb: 0,
      showinfo: 0,
      loop: 0,
      modestbranding: 1,
      rel: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      mute: 1,
    },
  };
  const onEnd = (event) => {
    event.target.seekTo(0);
  };

  return (
    <div className={styles.FullWidthVideo}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => {
          setHeight(100);
          event.target.playVideo();
        }}
        onEnd={onEnd}
        className={styles.YouTubeVideo}
      />
    </div>
  );
}

export default FullWidthVideo;
