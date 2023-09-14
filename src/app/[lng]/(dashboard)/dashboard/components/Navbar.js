import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link href="/dashboard">Your App Logo</Link>
      </div>
      <div className={styles.navbarLinks}>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
          <li>
            <Link href="/dashboard/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
