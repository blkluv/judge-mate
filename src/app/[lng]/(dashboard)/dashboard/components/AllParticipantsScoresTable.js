import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { realTimeDatabase, db } from "../../../../../firebase/config";

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

  return (
    <div>
      <h2>All Scores for Event ID: {eventId}</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Participant</th>
            {allJudges.map((judgeId) => (
              <th colSpan={categories.length} key={judgeId}>
                {usernames[judgeId] || judgeId}
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {allJudges.flatMap((judgeId) =>
              categories.map((category) => (
                <th key={`${judgeId}-${category}`}>{category}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {allParticipants.map((participantId) => (
            <tr key={participantId}>
              <td>{usernames[participantId] || participantId}</td>
              {allJudges.map((judgeId) =>
                categories.map((category) => (
                  <td key={`${judgeId}-${category}`}>
                    {allScores[judgeId] && allScores[judgeId][participantId]
                      ? allScores[judgeId][participantId].join(", ")
                      : "No scores"}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {allJudges.length === 0 && <p>No scores available yet!</p>}
    </div>
  );
};

export default AllParticipantsScoresTable;
