import { useState, useEffect } from "react";
import { fetchData } from "../../../../../../../firebase/firestore/fetchData";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../../../../../firebase/config";
import styles from "./EventUsers.module.css";

function EventUsers({ eventId, refreshData }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all");
  const [approvalFilter, setApprovalFilter] = useState("all");
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

      const fetchedUsers = userSnapshots.docs.map((userDoc) => {
        return {
          id: userDoc.id,
          username: userDoc.data().username,
          role: data.roles[userDoc.id].role,
          isApproved: data.roles[userDoc.id].isApproved || false,
        };
      });

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
      approvalFilter === "all"
        ? true
        : approvalFilter === "approved"
        ? user.isApproved
        : !user.isApproved
    )
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
        <div>
          <label>Filtruj po roli: </label>
          <select
            className={styles.selectRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Wszyscy</option>
            <option value="judge">Sędzia</option>
            <option value="organizer">Organizator</option>
          </select>
        </div>

        <div>
          <label>Status zatwierdzenia: </label>
          <select
            className={styles.selectApproval}
            onChange={(e) => setApprovalFilter(e.target.value)}
          >
            <option value="all">Wszyscy</option>
            <option value="approved">Zatwierdzeni</option>
            <option value="notApproved">Nie zatwierdzeni</option>
          </select>
        </div>

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
            <th className={styles.tableHeading}>Zatwierdzony</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className={styles.userItem}>
              <td className={styles.username}>{user.username}</td>
              <td className={styles.role}>{user.role}</td>
              <td className={styles.approved}>
                {user.isApproved ? "Tak" : "Nie"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
