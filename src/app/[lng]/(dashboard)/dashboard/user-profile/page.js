"use client";
import React, { useState } from "react";
import EditUserProfile from "./components/EditUserProfile";
import UserProfileNavbar from "./components/UserProfileNavbar"; // Importuj nowy komponent Navbar
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
      <UserProfileNavbar setSelectedOption={setSelectedOption} />{" "}
      {/* Użyj komponentu Navbar */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}

export default Page;
