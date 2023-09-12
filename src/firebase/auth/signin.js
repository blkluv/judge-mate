import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let result = null,
    error = null,
    isVerified = true; // Dodane

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    // Check if the user is verified
    const user = result.user;
    isVerified = user.emailVerified;
  } catch (e) {
    error = e;
  }

  return { result, error, isVerified }; // Dodane pole isVerified
}
