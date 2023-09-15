import firebase_app from "../config";
import {
  getFirestore,
  doc,
  deleteDoc, // Dodajemy import deleteDoc
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteData(collectionName, id) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    result = "Document successfully deleted.";
  } catch (e) {
    error = e;
  }

  return { result, error };
}
