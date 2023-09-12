import { useState, useEffect } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";

function EventUsers({ eventId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchUsers();
  }, [eventId]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} - Rola: {user.role}
        </li>
      ))}
    </ul>
  );
}

export default EventUsers;
