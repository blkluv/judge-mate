import { useState } from "react";
import { ref, set } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config";
import JudgingTableDisplay from "./JudgingTableDisplay";
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

  const removeCategory = (idx) => {
    const newCategories = [...categories];
    newCategories.splice(idx, 1);
    setCategories(newCategories);
  };

  const handleChange = (idx, field, value) => {
    const newCategories = [...categories];
    newCategories[idx][field] = value;
    setCategories(newCategories);
  };

  const handleSubmit = async () => {
    const isValid = categories.every(
      (cat) => cat.name && cat.range[0] < cat.range[1]
    );
    if (!isValid) {
      alert("Please ensure all categories are valid before submitting.");
      return;
    }
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
              <button onClick={() => removeCategory(idx)}>Remove</button>
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
