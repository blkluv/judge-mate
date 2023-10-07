"use client";

import CreateEvent from "./components/CreateEvent";
import styles from "./page.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <CreateEvent />
    </div>
  );
}

export default Page;
