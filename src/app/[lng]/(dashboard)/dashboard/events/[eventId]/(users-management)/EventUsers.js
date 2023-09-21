import { useState, useEffect } from "react";
import { fetchData } from "../../../../../../../firebase/firestore/fetchData";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../../../../../firebase/config";
import styles from "./EventUsers.module.css";

function EventUsers({ eventId, refreshData }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const { data, error } = await fetchData("events", eventId);

    if (data) {
      const userIds = Object.keys(data.roles);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("__name__", "in", userIds));
      const userSnapshots = await getDocs(q);

      const fetchedUsers = userSnapshots.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        role: data.roles[doc.id],
      }));

      setUsers(fetchedUsers);
    }
    if (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [eventId, refreshData]);

  if (loading) {
    return <div className={styles.loadingMessage}>Loading users...</div>;
  }

  return (
    <div className={styles.eventUsersContainer}>
      <h2 className={styles.sectionHeading}>Event Users</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th className={styles.tableHeading}>Username</th>
            <th className={styles.tableHeading}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.userItem}>
              <td className={styles.username}>{user.username}</td>
              <td className={styles.role}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventUsers;
