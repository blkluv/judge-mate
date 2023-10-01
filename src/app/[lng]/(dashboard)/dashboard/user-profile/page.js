"use client";
import React, { useState } from "react";
import EditUserProfile from "./components/EditUserProfile";
import LogoutButton from "./components/LogoutButton";
import styles from "./page.module.css";

function Page() {
  const [selectedOption, setSelectedOption] = useState("Dane osobowe");

  const renderContent = () => {
    switch (selectedOption) {
      case "Dane osobowe":
        return <EditUserProfile />;
      case "Zamówienia":
        return <div>Lista Twoich zamówień...</div>;
      case "Ustawienia newslettera":
        return <div>Ustawienia subskrypcji newslettera...</div>;
      case "Pomoc i FAQ":
        return <div>Odpowiedzi na najczęściej zadawane pytania...</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setSelectedOption("Dane osobowe")}>
            Dane osobowe
          </li>
          <li onClick={() => setSelectedOption("Zamówienia")}>Zamówienia</li>
          <li onClick={() => setSelectedOption("Ustawienia newslettera")}>
            Ustawienia newslettera
          </li>
          <li onClick={() => setSelectedOption("Pomoc i FAQ")}>Pomoc i FAQ</li>
        </ul>
        <LogoutButton />
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}

export default Page;
