import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOutUser() {
  let success = true,
    error = null;

  try {
    await signOut(auth);
  } catch (e) {
    success = false;
    error = e;
  }

  return { success, error };
}
