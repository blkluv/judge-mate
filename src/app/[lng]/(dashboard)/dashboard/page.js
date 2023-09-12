"use client";

import { useAuthContext } from "../../../../firebase/context/AuthContext";
import Navbar from "../dashboard/components/Navbar"; // Upewnij się, że ścieżki są właściwe
import UserProfile from "../dashboard/components/UserProfile";
import LogoutButton from "../dashboard/components/logout-button/LogoutButton";
import CreateEvent from "../dashboard/components/CreateEvent";
import EventList from "./components/EventsList";

function Page() {
  const { user } = useAuthContext();
  console.log("uzytkownik zalogowany dashboardPage: ", user);

  return (
    <div>
      {user && (
        <div>
          <Navbar />
          <UserProfile />
          <LogoutButton />
          <CreateEvent />
          <EventList />
        </div>
      )}
    </div>
  );
}

export default Page;
