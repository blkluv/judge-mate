import { useState, useEffect } from "react";
import { ref, get, onValue, off } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config";
import styles from "./JudgingTableDisplay.module.css";

const JudgingTableDisplay = ({ eventId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Funkcja do obsługi zmian w bazie danych
    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setCategories(snapshot.val());
      }
    };

    // Referencja do tabeli w bazie danych
    const tableRef = ref(realTimeDatabase, `judgingTables/${eventId}`);

    // Nasłuchuj zmian w bazie danych i aktualizuj widok
    onValue(tableRef, handleDataChange);

    // Zatrzymaj nasłuchiwanie po odmontowaniu komponentu
    return () => {
      off(tableRef, "value", handleDataChange);
    };
  }, [eventId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Judging Table</h2>
      {categories.length === 0 ? (
        <p className={styles.noCategories}>No categories defined yet!</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td>{cat.name}</td>
                <td>
                  {cat.range[0]} to {cat.range[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JudgingTableDisplay;
