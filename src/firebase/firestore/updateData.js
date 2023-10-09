import { updateDoc, doc, getFirestore } from "firebase/firestore";
import firebase_app from "../config";

export async function updateData(collectionName, id, data) {
  const db = getFirestore(firebase_app);
  const docRef = doc(db, collectionName, id);

  try {
    console.log("Aktualizacja danych:", data);

    await updateDoc(docRef, data);
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: e };
  }
}
