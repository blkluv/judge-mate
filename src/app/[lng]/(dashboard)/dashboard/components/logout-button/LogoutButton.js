import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./LogoutButton.module.css"; // Zaimportuj odpowiednie style

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      // Tutaj możesz dodać dodatkową logikę po wylogowaniu
      router.push("/"); // Przekieruj użytkownika po wylogowaniu (dostosuj ścieżkę)
    } catch (error) {
      console.log("Błąd wylogowania:", error);
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Wyloguj
    </button>
  );
}

export default LogoutButton;
