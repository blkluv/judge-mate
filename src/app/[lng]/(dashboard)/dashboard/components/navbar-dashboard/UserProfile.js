import React from "react";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext";
import Link from "next/link";
import styles from "./UserProfile.module.css";

function UserProfile() {
<<<<<<< HEAD
  const { currentUserData, loading } = useAuthContext();
  const username = currentUserData ? currentUserData.username : null;

  console.log("uzytkownik zalogowany userProfile: ", username);

  if (loading) {
    return <div>Wczytywanie profilu użytkownika...</div>;
=======
  const currentUser = auth.currentUser;

  // Użyj obiektu stanu do śledzenia nazwy użytkownika, stanu ładowania i błędu
  const [state, setState] = useState({
    username: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Pobierz nazwę użytkownika z Firestore, używając kolekcji "users" i identyfikatora "userId"
    async function fetchUsername() {
      if (!currentUser) {
        setState({ loading: false, error: "Nie jesteś zalogowany" });
        return;
      }

      const userId = currentUser.uid;
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setState({ loading: false, username: data.username });
      }

      if (error) {
        setState({ error });
      }
    }

    fetchUsername();
  }, [currentUser]);

  // Sprawdź, czy nazwa użytkownika jest załadowana i nie wystąpił błąd
  if (state.loading) {
    return <div>Loading user profile...</div>;
  }

  if (state.error) {
    return <div>Error loading user profile: {state.error.message}</div>;
>>>>>>> 28d4057aeda20afa047f343387233b527312b27f
  }

  // Wyrenderuj link do profilu użytkownika
  return (
    <Link href="/dashboard/user-profile" className={styles.userProfile}>
      <img src="/icons/user-circle.svg" alt="logo" className={styles.icon} />
      <p className={styles.userName}>{state.username}</p>
    </Link>
  );
}

export default React.memo(UserProfile);
