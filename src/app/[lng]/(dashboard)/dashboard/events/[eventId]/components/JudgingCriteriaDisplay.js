import { useState, useEffect } from "react";
import { ref, get, onValue, off } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config";
import styles from "./JudgingCriteriaDisplay.module.css"; // Zmieniony import stylów

const JudgingCriteriaDisplay = ({ eventId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setCategories(snapshot.val());
      }
    };

    const tableRef = ref(realTimeDatabase, `judgingTables/${eventId}`);
    onValue(tableRef, handleDataChange);

    return () => {
      off(tableRef, "value", handleDataChange);
    };
  }, [eventId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Judging Criteria</h2> {/* Zmieniony tytuł */}
      {categories.length === 0 ? (
        <p className={styles.noCategories}>No criteria defined yet!</p>
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

export default JudgingCriteriaDisplay; // Zmieniona nazwa eksportowanego komponentu
