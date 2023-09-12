import { useState } from "react";
import { ref, set } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config"; // Zakładam, że tak jest skonfigurowana baza danych

const JudgingTableCreator = ({ eventId }) => {
  const [categories, setCategories] = useState([{ name: "", range: [1, 10] }]);

  const addCategory = () => {
    setCategories([...categories, { name: "", range: [1, 10] }]);
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
    <div>
      <h2>Define Judging Table for Event ID: {eventId}</h2>
      {categories.map((cat, idx) => (
        <div key={idx}>
          <input
            value={cat.name}
            placeholder="Category Name"
            onChange={(e) => handleChange(idx, "name", e.target.value)}
          />
          <input
            type="number"
            value={cat.range[0]}
            onChange={(e) =>
              handleChange(idx, "range", [e.target.value, cat.range[1]])
            }
          />
          to
          <input
            type="number"
            value={cat.range[1]}
            onChange={(e) =>
              handleChange(idx, "range", [cat.range[0], e.target.value])
            }
          />
        </div>
      ))}
      <button onClick={addCategory}>Add Category</button>
      <button onClick={handleSubmit}>Submit Judging Table</button>
    </div>
  );
};

export default JudgingTableCreator;
