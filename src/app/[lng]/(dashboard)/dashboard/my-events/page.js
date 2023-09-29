"use client";

import MyCreatedEventsList from "./MyCreatedEventsList";
import MyEventsList from "./MyEventsList";
import styles from "./page.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <MyCreatedEventsList />
      <MyEventsList />
    </div>
  );
}

export default Page;
