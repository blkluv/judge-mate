import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { realTimeDatabase } from "../../../../../firebase/config";

const JudgingTableDisplay = ({ eventId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchJudgingTable = async () => {
      const tableRef = ref(realTimeDatabase, `judgingTables/${eventId}`);
      const snapshot = await get(tableRef);
      if (snapshot.exists()) {
        setCategories(snapshot.val());
      }
    };

    fetchJudgingTable();
  }, [eventId]);

  return (
    <div>
      <h2>Judging Table for Event ID: {eventId}</h2>
      {categories.length === 0 && <p>No categories defined yet!</p>}
      {categories.map((cat, idx) => (
        <div key={idx}>
          <span>
            <strong>Category Name:</strong> {cat.name}
          </span>
          <span>
            {" "}
            | Range: {cat.range[0]} to {cat.range[1]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default JudgingTableDisplay;
