import React from "react";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.loader}>
    <svg
      id="Warstwa_1"
      data-name="Warstwa 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      width="200"
      height="200"
    >
      <polygon
        className="cls-2"
        points="148.62 49.88 148.62 0 99.25 0 49.37 0 0 0 0 49.88 49.37 49.88 49.37 148.62 99.25 148.62 99.25 49.88 148.62 49.88"
      />
      <rect
        className="cls-1"
        x="123.84"
        y="99.05"
        width="49.56"
        height="49.57"
        fill="orange"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 148.62 123.84"
          to="360 148.62 123.84"
          dur="10s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
);

export default Loading;
