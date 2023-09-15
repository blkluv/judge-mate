"use client";

import { useAuthContext } from "../../../../firebase/context/AuthContext";
import UserProfile from "../dashboard/components/UserProfile";
import LogoutButton from "../dashboard/components/logout-button/LogoutButton";
import CreateEvent from "./create-event/components/CreateEvent";
import EventList from "./components/EventsList";

function Page() {
  const { user } = useAuthContext();
  console.log("uzytkownik zalogowany dashboardPage: ", user);

  return (
    <div>
      {user && (
        <div>
          <UserProfile />

          <EventList />
        </div>
      )}
    </div>
  );
}

export default Page;
