import React from "react";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.loader}>
    <img
      src="/images/JudgeMateLogotypBlackRotate.svg"
      alt="Loading Logo"
      width="200"
      height="200"
    />
  </div>
);

export default Loading;
