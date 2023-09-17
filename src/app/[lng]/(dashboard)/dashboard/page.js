"use client";

import { useAuthContext } from "../../../../firebase/context/AuthContext";
import UserProfile from "./components/navbar-dashboard/UserProfile";
import MyEventsList from "./my-events/MyEventsList";

function Page() {
  const { user } = useAuthContext();
  console.log("uzytkownik zalogowany dashboardPage: ", user);

  return (
    <div>
      {user && (
        <div>
          <MyEventsList />
        </div>
      )}
    </div>
  );
}

export default Page;
