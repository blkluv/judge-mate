import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { realTimeDatabase, db } from "../../../../../../../firebase/config";
import styles from "./AllParticipantsScoresTable.module.css"; // Zaimportowanie arkusza stylów

const AllParticipantsScoresTable = ({ eventId }) => {
  const [allScores, setAllScores] = useState({});
  const [usernames, setUsernames] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const scoresRef = ref(realTimeDatabase, `eventJudging/${eventId}`);
    const scoresListener = onValue(scoresRef, (snapshot) => {
      if (snapshot.exists()) {
        setAllScores(snapshot.val());
      }
    });

    // Fetch categories
    const categoriesRef = ref(realTimeDatabase, `judgingTables/${eventId}`);
    const categoriesListener = onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        setCategories(snapshot.val().map((item) => item.name));
      }
    });

    return () => {
      off(scoresRef, "value", scoresListener);
      off(categoriesRef, "value", categoriesListener);
    };
  }, [eventId]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const uniqueIds = Object.keys(allScores).concat(
        ...Object.values(allScores).map(Object.keys)
      );
      const usernamesMap = {};

      for (const id of uniqueIds) {
        const userDocRef = doc(db, "users", id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          usernamesMap[id] = userDocSnap.data().username;
        }
      }

      setUsernames(usernamesMap);
    };

    if (Object.keys(allScores).length) {
      fetchUsernames();
    }
  }, [allScores]);

  const allJudges = Object.keys(allScores);
  const allParticipants = [
    ...new Set(allJudges.flatMap((judgeId) => Object.keys(allScores[judgeId]))),
  ];
  // Oblicz sumę punktów dla każdego uczestnika
  const calculateTotalScores = () => {
    const totalScores = {};
    for (const judgeId in allScores) {
      for (const participantId in allScores[judgeId]) {
        if (!totalScores[participantId]) {
          totalScores[participantId] = 0;
        }
        totalScores[participantId] += Object.values(
          allScores[judgeId][participantId]
        ).reduce((a, b) => a + b, 0);
      }
    }
    return totalScores;
  };

  const totalScores = calculateTotalScores();

  // Posortuj uczestników według ich łącznej liczby punktów
  const sortedParticipants = allParticipants.sort(
    (a, b) => totalScores[b] - totalScores[a]
  );
  return (
    <div className={styles.allParticipantsScoresTable}>
      <h2>All Scores for Event ID: {eventId}</h2>
      <table className={styles.allScoresTable} border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Participant</th>
            {allJudges.map((judgeId) => (
              <th colSpan={categories.length} key={judgeId}>
                {usernames[judgeId] || judgeId}
              </th>
            ))}
            <th>Total</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            {allJudges.flatMap((judgeId) =>
              categories.map((category) => (
                <th key={`${judgeId}-${category}`}>{category}</th>
              ))
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.map((participantId, index) => (
            <tr key={participantId}>
              <td>{index + 1}</td>
              <td>{usernames[participantId] || participantId}</td>
              {allJudges.flatMap((judgeId) =>
                categories.map((category, categoryIndex) => (
                  <td key={`${judgeId}-${category}`}>
                    {allScores[judgeId] &&
                    allScores[judgeId][participantId] &&
                    typeof allScores[judgeId][participantId][categoryIndex] !==
                      "undefined"
                      ? allScores[judgeId][participantId][categoryIndex]
                      : "No scores"}
                  </td>
                ))
              )}
              <td>{totalScores[participantId]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allJudges.length === 0 && (
        <p className={styles.noScoresAvailable}>No scores available yet!</p>
      )}
    </div>
  );
};

export default AllParticipantsScoresTable;
