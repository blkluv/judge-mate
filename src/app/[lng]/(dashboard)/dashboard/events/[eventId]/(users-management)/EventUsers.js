import { useState, useEffect } from "react";
import { fetchData } from "../../../../../../../firebase/firestore/fetchData";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../../../../../firebase/config";
import styles from "./EventUsers.module.css";

function EventUsers({ eventId, refreshData }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users
    .filter((user) => selectedRole === "all" || user.role === selectedRole)
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (loading) {
    return <div className={styles.loadingMessage}>Loading users...</div>;
  }

  return (
    <div className={styles.eventUsersContainer}>
      <h2 className={styles.sectionHeading}>Event Users</h2>

      <div className={styles.filtersContainer}>
        {/* Filtrowanie po roli */}
        <div>
          <label>Filtruj po roli: </label>
          <select
            className={styles.selectRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Wszyscy</option>
            <option value="judge">Sędzia</option>
            <option value="organizer">Organizator</option>
            {/* ... inne role */}
          </select>
        </div>

        {/* Wyszukiwanie użytkownika */}
        <div>
          <label>Wyszukaj: </label>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Wyszukaj użytkownika..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th className={styles.tableHeading}>Username</th>
            <th className={styles.tableHeading}>Role</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className={styles.userItem}>
              <td className={styles.username}>{user.username}</td>
              <td className={styles.role}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginacja */}
      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Poprzednia
        </button>
        <button
          className={styles.paginationButton}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage))
            )
          }
          disabled={currentPage * usersPerPage >= filteredUsers.length}
        >
          Następna
        </button>
      </div>
    </div>
  );
}

export default EventUsers;
