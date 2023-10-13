"use client";
import React, { useRef } from "react";
import MyCreatedEventsList from "./MyCreatedEventsList";
import MyEventsList from "./MyEventsList";
import styles from "./page.module.css";

function Page() {
  const myEventsListRef = useRef(null);

  const handleEventDeleted = () => {
    if (myEventsListRef.current) {
      myEventsListRef.current.refreshEvents();
    }
  };

  return (
    <div className={styles.container}>
      <MyCreatedEventsList onEventDeleted={handleEventDeleted} />
      <MyEventsList ref={myEventsListRef} />
    </div>
  );
}

export default Page;
