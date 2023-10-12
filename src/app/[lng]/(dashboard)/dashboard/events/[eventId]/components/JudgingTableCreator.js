import { useState } from "react";
import { ref, set } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config";

import styles from "./JudgingTableCreator.module.css";

const JudgingTableCreator = ({ eventId }) => {
  const [categories, setCategories] = useState([{ name: "", range: [1, 10] }]);

  const addCategory = () => {
    setCategories([...categories, { name: "", range: [1, 10] }]);
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
      <h2 className={styles.title}>Define Judging Table</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Range Start</th>
              <th>Range End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className={styles.input}
                    value={cat.name}
                    placeholder="Category Name"
                    onChange={(e) => handleChange(idx, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={cat.range[0]}
                    onChange={(e) =>
                      handleChange(idx, "range", [e.target.value, cat.range[1]])
                    }
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={cat.range[1]}
                    onChange={(e) =>
                      handleChange(idx, "range", [cat.range[0], e.target.value])
                    }
                  />
                </td>
                <td>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeCategory(idx)}
                  >
                    <img
                      src="/icons/delete.svg"
                      alt="logo"
                      className={styles.logo}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.addButton} onClick={addCategory}>
        + Add Category
      </button>
      <button className={styles.button} onClick={handleSubmit}>
        Submit Judging Table
      </button>
    </div>
  );
};

export default JudgingTableCreator;
