import { useState, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config"; // Zakładam, że tak jest skonfigurowana baza danych
import JudgingTableDisplay from "./JudgingTableDisplay"; // Import komponentu do wyświetlania tabeli
import styles from "./JudgingTableCreator.module.css";

const JudgingTableCreator = ({ eventId }) => {
  const [categories, setCategories] = useState([{ name: "", range: [1, 10] }]);
  const [editableCategoryIndex, setEditableCategoryIndex] = useState(-1);

  const addCategory = () => {
    setCategories([...categories, { name: "", range: [1, 10] }]);
  };

  const editCategory = (idx) => {
    setEditableCategoryIndex(idx);
  };

  const saveCategory = () => {
    setEditableCategoryIndex(-1);
  };

  const handleChange = (idx, field, value) => {
    const newCategories = [...categories];
    newCategories[idx][field] = value;
    setCategories(newCategories);
  };

  const handleSubmit = async () => {
    // Zapisz kategorie w Firebase Realtime Database pod konkretnym eventId
    const tableRef = ref(realTimeDatabase, `judgingTables/${eventId}`);
    await set(tableRef, categories);
    alert("Judging table defined for event!");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Define Judging Table for Event ID: {eventId}
      </h2>
      {categories.map((cat, idx) => (
        <div className={styles.category} key={idx}>
          {editableCategoryIndex === idx ? (
            <div className={styles.editMode}>
              <input
                className={styles.input}
                value={cat.name}
                placeholder="Category Name"
                onChange={(e) => handleChange(idx, "name", e.target.value)}
              />
              <input
                className={styles.input}
                type="number"
                value={cat.range[0]}
                onChange={(e) =>
                  handleChange(idx, "range", [e.target.value, cat.range[1]])
                }
              />
              to
              <input
                className={styles.input}
                type="number"
                value={cat.range[1]}
                onChange={(e) =>
                  handleChange(idx, "range", [cat.range[0], e.target.value])
                }
              />
              <button onClick={saveCategory}>Save</button>
            </div>
          ) : (
            <div className={styles.viewMode}>
              <span>
                <strong>Category Name:</strong> {cat.name}
              </span>
              <span>
                {" "}
                | Range: {cat.range[0]} to {cat.range[1]}
              </span>
              <button onClick={() => editCategory(idx)}>Edit</button>
            </div>
          )}
        </div>
      ))}

      <button className={styles.button} onClick={addCategory}>
        Add Category
      </button>
      <button className={styles.button} onClick={handleSubmit}>
        Submit Judging Table
      </button>
      <JudgingTableDisplay eventId={eventId} />
    </div>
  );
};

export default JudgingTableCreator;
