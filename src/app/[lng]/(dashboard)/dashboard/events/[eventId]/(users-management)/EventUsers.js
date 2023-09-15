import { useState, useEffect } from "react";
import { fetchData } from "../../../../../../../firebase/firestore/fetchData";
import styles from "./EventUsers.module.css"; // Zaimportowanie arkusza stylów

function EventUsers({ eventId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funkcja do pobierania użytkowników na podstawie danego eventId
  async function fetchUsers() {
    const { data, error } = await fetchData("events", eventId);

    if (data) {
      const fetchedUsers = [];
      for (let userId in data.roles) {
        const userData = await fetchData("users", userId);
        if (userData.data) {
          fetchedUsers.push({
            id: userId,
            username: userData.data.username,
            role: data.roles[userId],
          });
        }
      }
      setUsers(fetchedUsers);
    }
    if (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    // Wywołaj funkcję fetchUsers, gdy komponent zostanie zamontowany
    fetchUsers();
  }, [eventId]);

  // Nasłuchuj zmian w eventId i ponownie pobieraj użytkowników
  useEffect(() => {
    setLoading(true); // Ustaw stan "loading" na true podczas ponownego pobierania danych
    setUsers([]); // Wyczyść istniejącą listę użytkowników
    fetchUsers(); // Ponownie pobierz użytkowników
  }, [eventId]);

  if (loading) {
    return <div className={styles.loadingMessage}>Loading users...</div>;
  }

  return (
    <div className={styles.eventUsersContainer}>
      <h2 className={styles.sectionHeading}>Event Users</h2>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <span className={styles.username}>{user.username}</span> - Rola:{" "}
            <span className={styles.role}>{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventUsers;
