import { useState, useEffect, useCallback } from "react";
import { ref, set, get } from "firebase/database";
import { realTimeDatabase } from "../../../../../../../firebase/config";
import { db } from "../../../../../../../firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import styles from "./JudgeScoring.module.css";

const JudgeScoring = ({ eventId, userId }) => {
  const [categories, setCategories] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState({});

  const fetchCategories = async () => {
    const tableRef = ref(realTimeDatabase, `judgingTables/${eventId}`);
    try {
      const snapshot = await get(tableRef);
      if (snapshot.exists()) setCategories(snapshot.val());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const eventDocRef = doc(db, "events", eventId);
      const eventDocSnap = await getDoc(eventDocRef);
      if (eventDocSnap.exists()) {
        const eventRoles = eventDocSnap.data().roles;
        const participantIds = Object.keys(eventRoles).filter(
          (uid) => eventRoles[uid] === "participant"
        );

        const participantsDetails = await Promise.all(
          participantIds.map(async (id) => {
            const userDocRef = doc(db, "users", id);
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.exists() ? { id, ...userDocSnap.data() } : null;
          })
        );
        setParticipants(participantsDetails.filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const fetchPreviousScores = async () => {
    const scoresRef = ref(
      realTimeDatabase,
      `eventJudging/${eventId}/${userId}`
    );
    try {
      const snapshot = await get(scoresRef);
      if (snapshot.exists()) {
        setScores(snapshot.val());
      }
    } catch (error) {
      console.error("Error fetching previous scores:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchParticipants();
    fetchPreviousScores();
  }, [eventId]);

  const debouncedSave = useCallback(
    debounce(async (participantId, categoryId, value) => {
      const scoreRef = ref(
        realTimeDatabase,
        `eventJudging/${eventId}/${userId}/${participantId}/${categoryId}`
      );
      try {
        await set(scoreRef, value);
      } catch (error) {
        console.error("Error while saving the score:", error);
      }
    }, 500),
    [eventId, userId]
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleScoreChange = (participantId, categoryId, value) => {
    if (value === "") {
      setScores((prev) => {
        const updatedScores = { ...prev };
        if (updatedScores[participantId]) {
          delete updatedScores[participantId][categoryId];
          if (Object.keys(updatedScores[participantId]).length === 0) {
            delete updatedScores[participantId];
          }
        }
        return updatedScores;
      });
      const scoreRef = ref(
        realTimeDatabase,
        `eventJudging/${eventId}/${userId}/${participantId}/${categoryId}`
      );
      set(scoreRef, null);
      return;
    }

    const numValue = Number(value);
    if (
      numValue < categories[categoryId].range[0] ||
      numValue > categories[categoryId].range[1]
    ) {
      return;
    }

    setScores((prev) => {
      const updatedScores = {
        ...prev,
        [participantId]: {
          ...(prev[participantId] || {}),
          [categoryId]: numValue,
        },
      };
      debouncedSave(participantId, categoryId, numValue);
      return updatedScores;
    });
  };

  return (
    <div className={styles.judgeScoringContainer}>
      <h3 className={styles.judgeSectionHeading}>Score the participants:</h3>
      <table className={styles.scoringTable}>
        <thead>
          <tr>
            <th>Participant</th>
            {categories.map((cat, idx) => (
              <th key={idx}>{cat.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.username}</td>
              {categories.map((cat, idx) => (
                <td key={idx}>
                  <input
                    className={styles.scoringInput}
                    type="number"
                    min={cat.range[0]}
                    max={cat.range[1]}
                    value={scores[participant.id]?.[idx] || ""}
                    onChange={(e) =>
                      handleScoreChange(participant.id, idx, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JudgeScoring;
